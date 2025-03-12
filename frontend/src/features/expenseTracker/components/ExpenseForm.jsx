import React, { useState } from 'react';
import axios from 'axios';
import '../ExpenseTracker.css';

const ExpenseForm = ({ fetchExpenses, closeModal }) => {
  const [personName, setPersonName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!personName || !amount) {
      alert('Please enter both name and amount');
      return;
    }

    try {
      await axios.post('/api/expenses', {
        personName,
        amount: parseFloat(amount),
        note
      });
      
      // Reset form
      setPersonName('');
      setAmount('');
      setNote('');
      
      // Refresh expense list
      fetchExpenses();
      
      // Close the modal if it exists
      if (closeModal) {
        closeModal();
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <form className="expense-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Person's Name"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <textarea
          placeholder="Note (What was this expense for?)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit" className="expense-button">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;