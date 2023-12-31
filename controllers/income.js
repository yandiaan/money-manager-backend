const IncomeSchema = require("../models/IncomeModel");
const moment = require("moment");

exports.addIncome = async (req, res) => {
  const { amount, category } = req.body;

  const income = IncomeSchema({
    amount,
    category,
    userId: req.user.userId, // Mengaitkan pendapatan dengan ID pengguna
  });

  try {
    //validations
    if (!category) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};

exports.getIncomesLastWeek = async (req, res) => {
  try {
    // Mengambil 2 income teratas
    const incomes = await IncomeSchema.find({ userId: req.user.userId })
      .sort({ amount: -1 })
      .limit(2);

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
