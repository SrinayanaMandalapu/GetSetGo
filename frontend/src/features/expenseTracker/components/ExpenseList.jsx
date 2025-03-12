import React from 'react';
import axios from 'axios';
import '../ExpenseTracker.css';

const ExpenseList = ({ expenses, fetchExpenses }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="expense-card expense-list">
      <h2>Expense History</h2>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense._id} className="expense-item">
            <div>
              <span className="expense-name">{expense.personName}</span>
              <p className="expense-note">{expense.note}</p>
              <small>{formatDate(expense.date)}</small>
            </div>
            <div className="expense-actions">
              <span className="expense-amount">${expense.amount.toFixed(2)}</span>
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(expense._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;