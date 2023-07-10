const ExpenseSchema = require("../models/ExpenseModel");
const PlanSchema = require("../models/PlanModel");
const moment = require("moment");

exports.addExpense = async (req, res) => {
    const { amount, category, note, date } = req.body;
  
    const expense = new ExpenseSchema({
      amount,
      category,
      note,
      date,
      userId: req.user.userId,
    });
  
    try {
      // Validations
      if (!category || !note || !date) {
        return res.status(400).json({ message: 'All fields are required!' });
      }
      if (amount <= 0 || !amount === 'number') {
        return res.status(400).json({ message: 'Amount must be a positive number!' });
      }
  
      // Check if budget exists with the same name as category
      const budget = await PlanSchema.findOne({ userId: req.user.userId, category: category });
      if (budget) {
          budget.spent += amount;
          await budget.save();
      }
  
      await expense.save();
      res.status(200).json({ message: 'Expense added' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

exports.getExpensesLastWeek = async (req, res) => {
    try {
      const today = moment(); // Awal hari ini
      const lastWeekStartDate = moment(today).subtract(1, 'week'); // Tanggal 1 minggu yang lalu termasuk hari ini
  
      // Mengambil tanggal $gte dan $lte dari permintaan tubuh (request body) jika ada
      const { startDate, endDate } = req.body;
      
      const startDateToUse = startDate ? moment(startDate) : lastWeekStartDate.startOf('day');
      const endDateToUse = endDate ? moment(endDate) : today.endOf('day');
  
      // Mengambil data pengeluaran dalam rentang tanggal
      const expenses = await ExpenseSchema.find({
        userId: req.user.userId,
        date: { $gte: startDateToUse, $lte: endDateToUse }
      }).sort({ date: -1 });
  
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  