// routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// @route   GET api/expenses
// @desc    Get all expenses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/expenses/:tripId
// @desc    Get all expenses for a trip
// @access  Public
router.get('/trip/:tripId', async (req, res) => {
  try {
    const expenses = await Expense.find({ tripId: req.params.tripId });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/expenses
// @desc    Add an expense
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { personName, amount, note, tripId } = req.body;
    
    const newExpense = new Expense({
      personName,
      amount,
      note,
      tripId: tripId || null // Handle case when tripId is not provided
    });
    
    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/expenses/:id
// @desc    Delete an expense
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }
    
    await Expense.findByIdAndDelete(req.params.id); // Updated to newer method
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Expense not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;