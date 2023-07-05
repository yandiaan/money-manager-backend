const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"expense"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    note: {
        type: String,
        required: true,
        maxLength: 255,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)