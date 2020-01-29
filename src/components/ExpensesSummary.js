import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
  const expenseWord = props.expenses.length === 1 ? 'expense' : 'expenses';
  const formattedTotal = numeral(getExpensesTotal(props.expenses)/100).format('$0,0.00');
  return (
    <div>
      {
        props.expenses && 
        props.expenses.length > 0 && 
        <h1>Viewing {props.expenses.length} {expenseWord} totalling {formattedTotal}</h1>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);