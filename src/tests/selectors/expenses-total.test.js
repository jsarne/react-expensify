import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('return 0 if no expenses', () => {
  expect(getExpensesTotal()).toEqual(0);
  expect(getExpensesTotal([])).toEqual(0);
});

test('add up a single expense', () => {
  expect(getExpensesTotal([expenses[0]])).toEqual(expenses[0].amount);
});

test('add up multiple expenses', () => {
  expect(getExpensesTotal(expenses)).toEqual(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});