import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';

// normalize display across browsers - i.e. CSS reset
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const myStore = configureStore();

const jsx = (
  <Provider store={myStore}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));