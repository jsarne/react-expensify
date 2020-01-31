import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.match.params.id, expense);
    this.props.history.push('/');
  }

  onRemoveClick = () => {
    this.props.removeExpense(this.props.match.params.id);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm source="edit" expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemoveClick}>Remove Expense</button>
        </div>
        <div>
        </div>
      </div>
    );  
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((exp) => exp.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  removeExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);