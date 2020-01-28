/* eslint-disable no-undef */
import {addExpense, editExpense, removeExpense} from '../../actions/expenses';
import moment from 'moment';

test('remove', () => {
  const id = '123abc';
  const action = removeExpense(id);
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: id
  });
});

test('edit', () => {
  const id = '234def';
  const edits = {note: 'mah new note', amount: 23400};
  expect(editExpense(id, edits)).toEqual({
    type: 'EDIT_EXPENSE',
    id: id,
    edits: edits
  })
});

test('add', () => {
  const newExp = {description: 'd', amount: 12300, note: 'n', createdAt: moment()};
  expect(addExpense(newExp)).toEqual({
    type: 'ADD_EXPENSE',
    expense: {id: expect.any(String), ...newExp}
  });
});

test('add defaults', () => {
  expect(addExpense({})).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      amount: 0,
      note: '',
      createdAt: 0
    }
  });
});