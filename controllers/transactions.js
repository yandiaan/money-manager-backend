const IncomeSchema = require("../models/IncomeModel");
const ExpenseSchema = require("../models/ExpenseModel");
const PlanSchema = require("../models/PlanModel");
const moment = require("moment");

exports.getTransactionsByMonth = async (req, res) => {
    try {
      const { month, year } = req.query;
  
      // Validasi input bulan dan tahun
      if (!month || !year) {
        return res.status(400).json({ message: 'Month and year are required parameters.' });
      }
  
      const startDate = moment(`${year}-${month}-01`).startOf('month');
      const endDate = moment(startDate).endOf('month');
  
      // Ambil transaksi pengeluaran dan pemasukan dalam rentang tanggal
      const expenses = await ExpenseSchema.find({
        userId: req.user.userId,
        date: { $gte: startDate, $lte: endDate }
      });
  
      const incomes = await IncomeSchema.find({
        userId: req.user.userId,
        createdAt: { $gte: startDate, $lte: endDate }
      });
  
      res.status(200).json({ expenses, incomes });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  
  