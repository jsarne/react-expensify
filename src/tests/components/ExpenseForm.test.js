/* eslint-disable no-undef */
import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('render ExpenseForm w/defaults and add button text', () => {
  const wrapper = shallow(<ExpenseForm source='add' />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('button').text()).toBe("Add Expense");
});

test('render ExpenseForm for a given expense and default button text', () => {
  const exp = expenses[0];
  const wrapper = shallow(<ExpenseForm expense={exp}/>);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('button').text()).toBe("Save Expense");
});

test('invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  const mockEvent = {
    preventDefault: () => {}
  };
  wrapper.find('form').simulate('submit', mockEvent);
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('set description', () => {
  const wrapper = shallow(<ExpenseForm />);
  const mockEvent = {
    target: {value: 'new desc'}
  };
//  wrapper.find('input').at(0).simulate('change', mockEvent);
  wrapper.find({placeholder: 'Description'}).simulate('change', mockEvent);
  expect(wrapper.state('description')).toBe(mockEvent.target.value);
});

test('set note', () => {
  const wrapper = shallow(<ExpenseForm />);
  const mockEvent = {
    target: {value: 'new note'}
  };
  wrapper.find('textarea').simulate('change', mockEvent);
  expect(wrapper.state('note')).toBe(mockEvent.target.value);
});

test('set valid amount', () => {
  const wrapper = shallow(<ExpenseForm />);
  const mockEvent = {
    target: {value: '12.75'}
  };
  wrapper.find({placeholder: 'Amount'}).simulate('change', mockEvent);
  expect(wrapper.state('amount')).toBe(mockEvent.target.value);
});

test('set invalid amount', () => {
  const wrapper = shallow(<ExpenseForm />);
  const mockEvent = {
    target: {value: '12.aa'}
  };
  wrapper.find({placeholder: 'Amount'}).simulate('change', mockEvent);
  expect(wrapper.state('amount')).toBe("");
});

test('valid form submission', () => {
  const onSubmitSpy = jest.fn();
  // eslint-disable-next-line no-unused-vars
  const {id, ...expNoId} = expenses[2];
  const wrapper = shallow(<ExpenseForm expense={expNoId} onSubmit={onSubmitSpy}/>);
  const mockEvent = {
    preventDefault: () => {}
  };
  wrapper.find('form').simulate('submit', mockEvent);
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith(expNoId);
});

test('date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('calendar focus', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: true});
  expect(wrapper.state('calendarFocused')).toEqual(true);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: false});
  expect(wrapper.state('calendarFocused')).toEqual(false);
});