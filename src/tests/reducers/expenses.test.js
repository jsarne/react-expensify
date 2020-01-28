/* eslint-disable no-undef */
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('default state', () => {
  // @@INIT is React's init action
  expect(expensesReducer(undefined, {type: "@@INIT"})).toEqual([]);
});

test('remove valid id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const remainingExpenses = expensesReducer(expenses, action);
  expect(remainingExpenses).toEqual([expenses[0], expenses[2]]);
});

test('remove invalid id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 'foo'
  };
  const remainingExpenses = expensesReducer(expenses, action);
  expect(remainingExpenses).toEqual(expenses);
});

test('add', () => {
  const newExpense = {description: 'desc', amount: 25000, note: 'nota bene', createdAt: moment(3333)};
  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  };
  const newExpenses = expensesReducer(expenses, action);
  expect(newExpenses).toEqual([...expenses, newExpense]);
});

test('edit valid id', () => {
  const editedExpense = {...expenses[2], amount: 50000};
  const action = {
    type: 'EDIT_EXPENSE',
    id: editedExpense.id,
    edits: editedExpense
  };
  const newExpenses = expensesReducer(expenses, action);
  expect(newExpenses).toEqual([expenses[0], expenses[1], editedExpense]);
});

test('edit invalid id', () => {
  const editedExpense = {...expenses[2], amount: 50000};
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'bogus',
    edits: editedExpense
  };
  const newExpenses = expensesReducer(expenses, action);
  expect(newExpenses).toEqual(expenses);
});