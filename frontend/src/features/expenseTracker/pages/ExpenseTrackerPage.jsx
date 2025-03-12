import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import PersonalSummary from '../components/PersonalSummary';
import '../ExpenseTracker.css';

const ExpenseTrackerPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/expenses');
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="expense-container">
      <h1 className="expense-header">Trip Expense Tracker</h1>
      
      <div className="expense-card">
        <button className="expense-button" onClick={toggleModal}>
          Add New Expense
        </button>
      </div>
      
      {showModal && (
        <div className="expense-modal">
          <div className="expense-modal-content">
            <div className="modal-header">
              <h2>Add Expense</h2>
              <button className="modal-close" onClick={toggleModal}>×</button>
            </div>
            <ExpenseForm fetchExpenses={fetchExpenses} closeModal={toggleModal} />
          </div>
        </div>
      )}
      
      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <>
          <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />
          <PersonalSummary expenses={expenses} />
        </>
      )}
    </div>
  );
};

export default ExpenseTrackerPage;