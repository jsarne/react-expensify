import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('message for no expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('message for a single expense', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[expenses[1]]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('message for multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});
