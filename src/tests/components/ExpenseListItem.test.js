import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListItem} from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses'; 

test('render ExpenseListItem', () => {
  const exp = expenses[1];
  const wrapper = shallow(<ExpenseListItem key={exp.id} {...exp} />);
  expect(wrapper).toMatchSnapshot();
});