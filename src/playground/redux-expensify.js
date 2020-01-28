import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// actions: add, remove, edit expense. set text filter. sort by date, amount. set start & end date filters.
// deconstruct to provide default values
const addExpense = ({description='', note='', amount=0, createdAt=0}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});
const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});
const editExpense = ({id, edits} = {}) => ({
    type: 'EDIT_EXPENSE',
    id,
    edits
});

// reducer per store property (expense array, filter object)
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(exp => exp.id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(exp => exp.id === action.id ? {...exp, ...action.edits} : exp);
    default: 
      return state;
  }
};

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER': 
      return {...state, text: action.text};
    case 'SORT_BY_AMOUNT': 
      return {...state, sortBy: 'amount'};
    case 'SORT_BY_DATE': 
      return {...state, sortBy: 'date'};
    case 'SET_START_DATE': 
      return {...state, startDate: action.startDate};
    case 'SET_END_DATE': 
      return {...state, endDate: action.endDate};
    default: 
      return state;
  }
};

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((exp) => {
    return (exp.description.toLowerCase().includes(text.toLowerCase())) &&
    (typeof startDate !== 'number' || exp.createdAt >= startDate) &&
    (typeof endDate   !== 'number' || exp.createdAt <= endDate)
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;  // larger createdAt - i.e. more recent - first
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1; // larger amount first
    }
  });
};

// store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const exp1 = store.dispatch(addExpense({description: 'rent', amount: 100000, createdAt: -1000}));
const exp2 = store.dispatch(addExpense({description: 'coffee', amount: 300, createdAt: 1000}));
store.dispatch(removeExpense({id: exp1.expense.id}));
store.dispatch(editExpense({id: exp2.expense.id, edits: {amount: 500}}));
store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter('CO'));
store.dispatch(setTextFilter('E'));
store.dispatch(setTextFilter('X'));
store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(225));
store.dispatch(setEndDate());
store.dispatch(setStartDate(125));
store.dispatch(setEndDate(126));


// const demoState = {
//   expenses: [{
//     id: 'id1',
//     description: 'January rent',
//     note: 'final payment - moving out',
//     amount: 54500, //USD in pennies
//     createdAt: 0 // timestamp, 0 for now
//   }],
//   filters: {
//     text: 'rent', // search string
//     sortBy: 'amount', // sort field - date, amount
//     startDate: undefined,
//     endDate: undefined
//   }
// };
