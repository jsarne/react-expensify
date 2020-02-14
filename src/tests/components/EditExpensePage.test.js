import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editSpy, removeSpy, hist, wrapper, match;

beforeEach(() => {
  editSpy = jest.fn();
  removeSpy = jest.fn();
  hist = {push: jest.fn()};
  match = {params: {id: 1}};
  wrapper = shallow(<EditExpensePage expense={expenses[2]} editExpense={editSpy} history={hist} match={match} removeExpense={removeSpy}/>);
});

test('render EditExpense', () => {
  expect(wrapper).toMatchSnapshot();
});

test('handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(hist.push).toHaveBeenLastCalledWith('/');
  expect(editSpy).toHaveBeenLastCalledWith(match.params.id, expenses[2]);
  expect(removeSpy).toHaveBeenCalledTimes(0);
});

test('handle remove button, show modal', () => {
  wrapper.find('button[name="removeButton"]').simulate('click');
  expect(removeSpy).toHaveBeenCalledTimes(0);
  expect(editSpy).toHaveBeenCalledTimes(0);
});

test('handle remove button, accepted', () => {
  wrapper.find('button[name="removeYes"]').simulate('click');
  expect(hist.push).toHaveBeenLastCalledWith('/');
  expect(removeSpy).toHaveBeenLastCalledWith(match.params.id);
  expect(editSpy).toHaveBeenCalledTimes(0);
});

test('handle remove button, rejected', () => {
  wrapper.find('button[name="removeNo"]').simulate('click');
  expect(removeSpy).toHaveBeenCalledTimes(0);
  expect(editSpy).toHaveBeenCalledTimes(0);
});