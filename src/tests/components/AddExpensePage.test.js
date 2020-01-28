/* eslint-disable no-undef */
import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpenseSpy, hist, wrapper;

beforeEach(() => {
  addExpenseSpy = jest.fn();
  hist = {push: jest.fn()};
  wrapper = shallow(<AddExpensePage addExpense={addExpenseSpy} history={hist}/>);
});

test('render AddExpense', () => {
  expect(wrapper).toMatchSnapshot();
});

test('handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(hist.push).toHaveBeenLastCalledWith('/');
  expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
});