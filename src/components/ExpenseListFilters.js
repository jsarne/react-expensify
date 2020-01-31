import React from 'react';
import {connect} from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };

  onSortChange = (sortKey) => {
    switch (sortKey) {
      case "date": 
        this.props.sortByDate();
        return;
      case "amount": 
        this.props.sortByAmount();
        return;
    }
  }

  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}));
  }

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  }

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input 
              className="text-input" 
              placeholder="Search Expenses"
              type="text" 
              value={this.props.filters.text} onChange={this.onTextChange}/>
          </div>
          <div className="input-group__item">
            <select className="select" value={this.props.filters.sortBy} onChange={(e) => this.onSortChange(e.target.value)}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker 
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>  
    )
  }
}

const mapStateToProps = (state) => ({filters: state.filters});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (date) => dispatch(setStartDate(date)),
  setEndDate: (date) => dispatch(setEndDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
