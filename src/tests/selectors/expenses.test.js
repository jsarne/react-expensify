import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('filter by text', () => {
  const filters = {
    text: 'e', sortBy: 'date', startDate: undefined, endDate: undefined
  };
  expect(selectExpenses(expenses, filters)).toEqual([expenses[2], expenses[1]]);
});

test('filter by start date', () => {
  const filters = {
    text: '', sortBy: 'date', startDate: moment(0), endDate: undefined
  };
  expect(selectExpenses(expenses, filters)).toEqual([expenses[2], expenses[0]]);
});

test('filter by end date', () => {
  const filters = {
    text: '', sortBy: 'date', startDate: undefined, endDate: moment(0)
  };
  expect(selectExpenses(expenses, filters)).toEqual([expenses[0], expenses[1]]);
});

test('sort by date', () => {
  const filters = {
    text: '', sortBy: 'date', startDate: undefined, endDate: undefined
  };
  expect(selectExpenses(expenses, filters)).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('sort by amount', () => {
  const filters = {
    text: '', sortBy: 'amount', startDate: undefined, endDate: undefined
  };
  expect(selectExpenses(expenses, filters)).toEqual([expenses[1], expenses[2], expenses[0]]);
});