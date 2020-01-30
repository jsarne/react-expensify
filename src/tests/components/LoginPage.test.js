import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from '../../components/LoginPage';

test('render LoginPage', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('call login on button click', () => {
  const loginSpy = jest.fn();
  const wrapper = shallow(<LoginPage login={loginSpy} />);
  wrapper.find('button').simulate('click');
  expect(loginSpy).toHaveBeenCalledTimes(1);
});