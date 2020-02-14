import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
  state = {
    modalIsOpen: false
  }

  onSubmit = (expense) => {
    this.props.editExpense(this.props.match.params.id, expense);
    this.props.history.push('/');
  }

  onRemoveClick = () => {
    this.setState(() => ({modalIsOpen: true}));
  }

  onModalNo = () => {
    this.setState(() => ({modalIsOpen: false}));
  }

  onModalYes = () => {
    this.setState(() => ({modalIsOpen: false}));
    this.props.removeExpense(this.props.match.params.id);
    this.props.history.push('/');
  }

  render() {
    Modal.setAppElement(document.getElementById('app'));
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm source="edit" expense={this.props.expense} onSubmit={this.onSubmit} />
          <button name="removeButton" className="button button--secondary" onClick={this.onRemoveClick}>Remove Expense</button>
        </div>
        <Modal className="modal"
               isOpen={this.state.modalIsOpen}
               shouldCloseOnEsc={true}
               shouldCloseOnOverlayClick={true}
               onRequestClose={this.onModalNo}>
          <h2 className="modal__title">Delete Expense</h2>
          <p>Are you sure?</p>
          <div className="modal__buttons">
            <button className="button" name="removeYes" onClick={this.onModalYes}>Yes</button>
            <button className="button button--secondary" name="removeNo" onClick={this.onModalNo}>No</button>
          </div>
        </Modal>
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