import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount/100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
      buttonText: props.source === 'add' ? 'Add Expense' : 'Save Expense'
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({description}));
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({amount}));
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}));
    }
  }
  // same as above
  // onDateChange = (createdAt) => {
  //   this.setState(() => {
  //     return {createdAt};
  //   });
  // }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({error: 'Please provide description and amount.'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf()
      })
    }
  }

  onCalendarFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input 
          className="text-input"
          type="text" 
          placeholder="Description" 
          autoFocus 
          value={this.state.description}
          onChange={this.onDescriptionChange} />
        <input 
          type="text" 
          className="text-input"
          placeholder="Amount" 
          value={this.state.amount}
          onChange={this.onAmountChange} />
        <SingleDatePicker 
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onCalendarFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}  // no days are outside the range, so no need for a complex function
          displayFormat="YYYY-MM-DD"
        />
        <textarea 
          className="textarea"
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange} >
        </textarea>
        <div>
          <button className="button">{this.state.buttonText}</button>
        </div>
      </form>
    )
  }
}