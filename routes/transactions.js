const { addExpense, getExpense, deleteExpense, getExpensesLastWeek } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();


router.post('/add-income',authMiddleware, addIncome)
    .get('/get-incomes',authMiddleware, getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense',authMiddleware, addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .get('/expense/last-week', authMiddleware, getExpensesLastWeek)

module.exports = router