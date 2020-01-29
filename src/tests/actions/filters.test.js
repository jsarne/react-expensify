import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../../actions/filters';
import moment from 'moment';

test('start date filter action', () => {
  const d = moment();
  expect(setStartDate(d)).toEqual({
    type: 'SET_START_DATE',
    startDate: d
  });
});

test('end date filter action', () => {
  const d = moment();
  expect(setEndDate(d)).toEqual({
    type: 'SET_END_DATE',
    endDate: d
  });
});

test('date sort action', () => {
  expect(sortByDate()).toEqual({
    type: 'SORT_BY_DATE'
  });
});

test('amount sort action', () => {
  expect(sortByAmount()).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

test('text filter action', () => {
  const text = 'yo';
  expect(setTextFilter(text)).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  });
});

test('default text filter action', () => {
  expect(setTextFilter()).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});