import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';

// normalize display across browsers - i.e. CSS reset
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const myStore = configureStore();

// some testing - default sort order is date most recent at top
myStore.dispatch(addExpense({description: 'water bill', amount: 4500, createdAt: 12345}));
myStore.dispatch(addExpense({description: 'gas bill', amount: 1000, createdAt:   23456}));
myStore.dispatch(addExpense({description: 'rent', amount: 109500, createdAt:     10000}));

const jsx = (
  <Provider store={myStore}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));