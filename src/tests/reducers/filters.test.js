import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('defaults', () => {
  // @@INIT is React's init action
  expect(filtersReducer(undefined, {type: "@@INIT"})).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('sort by amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('sort by date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const state = filtersReducer(currentState, {type: 'SORT_BY_DATE'});
  expect(state.sortBy).toBe('date');
});

test('text filter', () => {
  const searchString = 'foo';
  const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text: searchString});
  expect(state.text).toEqual(searchString);
});

test('start date filter', () => {
  const startDate = moment(22222);
  const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate});
  expect(state.startDate).toEqual(startDate);
});

test('end date filter', () => {
  const endDate = moment(22222);
  const state = filtersReducer(undefined, {type: 'SET_END_DATE', endDate});
  expect(state.endDate).toEqual(endDate);
});