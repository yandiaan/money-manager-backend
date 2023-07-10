const { addExpense, getExpense, deleteExpense, getExpensesLastWeek } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, getIncomesLastWeek } = require('../controllers/income');
const { addPlan, getPlans, deletePlan } = require('../controllers/plan');
const { getTransactionsByMonth } = require('../controllers/transactions');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();


router.post('/add-income', authMiddleware, addIncome);
router.get('/get-incomes', authMiddleware, getIncomes);
router.delete('/delete-income/:id', deleteIncome);

router.get('/get-plans', authMiddleware, getPlans);
router.post('/add-plan', authMiddleware, addPlan);
router.delete('/delete-plan/:id', deletePlan);

router.post('/add-expense', authMiddleware, addExpense);
router.get('/get-expenses', getExpense);
router.delete('/delete-expense/:id', deleteExpense);

router.get('/monthly-transaction', authMiddleware, getTransactionsByMonth);

router.post('/expense/last-week', authMiddleware, getExpensesLastWeek);
router.post('/income/last-week', authMiddleware, getIncomesLastWeek);

module.exports = router