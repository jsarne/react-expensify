import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('message for no expenses', () => {
  const wrapper = shallow(<ExpensesSummary visibleExpenses={[]} allExpenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});

test('message for a single expense', () => {
  const wrapper = shallow(<ExpensesSummary visibleExpenses={[expenses[1]]} allExpenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});

test('message for multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary visibleExpenses={expenses} allExpenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});
