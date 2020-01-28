/* eslint-disable no-undef */
import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {defaultFilters, filtersTwo} from '../fixtures/filters';

let textSpy, dateSortSpy, amountSortSpy, startDateSpy, endDateSpy, wrapper;

beforeEach(() => {
  textSpy = jest.fn();
  dateSortSpy = jest.fn();
  amountSortSpy = jest.fn();
  startDateSpy = jest.fn();
  endDateSpy = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters 
      filters={defaultFilters}
      setTextFilter={textSpy}
      sortByDate={dateSortSpy}
      sortByAmount={amountSortSpy}
      setStartDate={startDateSpy}
      setEndDate={endDateSpy}
    />);
});

test('render ExpenseListFilters defaults', () => {
  expect(wrapper).toMatchSnapshot();
});

test('render ExpenseListFilters with nondefault values', () => {
  wrapper.setProps({filters: filtersTwo});
  expect(wrapper).toMatchSnapshot();
});

test('handle text change', () => {
  const mockEvent = {
    target: {value: 'gas'}
  };
  wrapper.find('input').simulate('change', mockEvent);
  expect(textSpy).toHaveBeenLastCalledWith(mockEvent.target.value);
});

test('sort by date', () => {
  const mockEvent = {
    target: {value: 'date'}
  };
  wrapper.find('select').simulate('change', mockEvent);
  expect(dateSortSpy).toHaveBeenCalledTimes(1);
  expect(amountSortSpy).toHaveBeenCalledTimes(0);
});

test('sort by amount', () => {
  const mockEvent = {
    target: {value: 'amount'}
  };
  wrapper.find('select').simulate('change', mockEvent);
  expect(dateSortSpy).toHaveBeenCalledTimes(0);
  expect(amountSortSpy).toHaveBeenCalledTimes(1);
});

test('handle date changes', () => {
  const yesterday = moment().startOf('day').subtract(1, 'days');
  const tomorrow = moment().endOf('day').add(1, 'days');
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate: yesterday, endDate: tomorrow});
  expect(startDateSpy).toHaveBeenLastCalledWith(yesterday);
  expect(endDateSpy).toHaveBeenLastCalledWith(tomorrow);
});

test('handle date focus changes', () => {
  wrapper.find('DateRangePicker').prop('onFocusChange')('startDate');
  expect(wrapper.state('calendarFocused')).toBe('startDate');
  wrapper.find('DateRangePicker').prop('onFocusChange')('endDate');
  expect(wrapper.state('calendarFocused')).toBe('endDate');
});