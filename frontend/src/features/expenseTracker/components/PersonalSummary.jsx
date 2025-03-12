import React, { useMemo } from 'react';
import '../ExpenseTracker.css';

const PersonalSummary = ({ expenses }) => {
  const summary = useMemo(() => {
    const personTotals = {};
    
    expenses.forEach((expense) => {
      if (personTotals[expense.personName]) {
        personTotals[expense.personName] += expense.amount;
      } else {
        personTotals[expense.personName] = expense.amount;
      }
    });
    
    return Object.entries(personTotals)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);
  }, [expenses]);
  
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  return (
    <div className="summary-container">
      <h2 className="summary-title">Expense Summary</h2>
      <div>
        <h3>Total Trip Expenses: ${totalExpenses.toFixed(2)}</h3>
        
        <div>
          <h3>Per Person:</h3>
          {summary.map((person) => (
            <div key={person.name} className="person-summary">
              <span>{person.name}</span>
              <span>${person.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalSummary;