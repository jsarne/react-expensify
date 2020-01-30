// react-test-renderer version
// import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
// import Header from '../../components/Header';

// test('header render', () => {
//   const renderer = new ReactShallowRenderer();
//   renderer.render(<Header />);
//   expect(renderer.getRenderOutput()).toMatchSnapshot();
// });


// enzyme version
import React from 'react';
import {shallow} from 'enzyme';
//import toJSON from 'enzyme-to-json';  // can skip this b/c we loaded this initializer in Jest config
import {Header} from '../../components/Header';

test('header render', () => {
  const wrapper = shallow(<Header logout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('call logout on button click', () => {
  const logoutSpy = jest.fn();
  const wrapper = shallow(<Header logout={logoutSpy} />);
  wrapper.find('button').simulate('click');
  expect(logoutSpy).toHaveBeenCalledTimes(1);
});