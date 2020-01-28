import { createStore } from 'redux';

// action generators are functions that return action objects
const incrementCount = ({incrementBy = 1} = {}) => ({ type: 'INCREMENT', incrementBy: incrementBy });
const decrementCount = ({decrementBy = 1} = {}) => ({ type: 'DECREMENT', decrementBy: decrementBy });
const setCount = ({count} = {}) => ({ type: 'SET', count: count });
const resetCount = () => ({ type: 'RESET' });


// reducers define how actions change application state. rules
// 1. must be pure functions - don't require or change anything outside function scope
// 2. never change state or action
const countReducer = (state = {count: 0}, action) => {
  switch (action.type) {
    case 'INCREMENT': 
      return {count: state.count + action.incrementBy};
    
      case 'DECREMENT': 
      return {count: state.count - action.decrementBy};
    
    case 'SET': 
      return {count: action.count};
    
    case 'RESET': 
      return {count: 0};
    
    default: 
      return state;
  }
};

const store = createStore(countReducer);

// eslint-disable-next-line no-unused-vars
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });
// store.dispatch({
//   type: 'INCREMENT'
// });
// store.dispatch({
//   type: 'DECREMENT'
// });
// store.dispatch({
//   type: 'DECREMENT',
//   decrementBy: 22
// });

store.dispatch(incrementCount());
store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy: 3}));

//unsubscribe();

// store.dispatch({
//   type: 'RESET'
// });
store.dispatch(resetCount());

// store.dispatch({
//   type: 'SET',
//   count: 101
// });
store.dispatch(setCount({count: 101}));

// will set count to 'undefined'
// store.dispatch({
//   type: 'SET'
// });
//store.dispatch(setCount());

