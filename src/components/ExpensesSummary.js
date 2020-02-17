import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
  const visibleWord = props.visibleExpenses.length === 1 ? 'expense' : 'expenses';
  const visibleTotal = numeral(getExpensesTotal(props.visibleExpenses)/100).format('$0,0.00');
  const hiddenCount = props.allExpenses.length - props.visibleExpenses.length;
  const hiddenWord = hiddenCount === 1 ? 'expense' : 'expenses';
  const hiddenTotal = numeral(getExpensesTotal(props.allExpenses)/100 - getExpensesTotal(props.visibleExpenses)/100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{props.visibleExpenses.length}</span> {visibleWord} totalling <span>{visibleTotal}</span></h1>
        {hiddenCount > 0 && <div><span>Hidden by filters: {hiddenCount}</span> {hiddenWord} totalling <span>{hiddenTotal}</span></div>}
        <div className="page-header__actions">
          <Link to="/create" className="button">Add Expense</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    visibleExpenses: selectExpenses(state.expenses, state.filters),
    allExpenses: state.expenses
  };
};

export default connect(mapStateToProps)(ExpensesSummary);