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
import Header from '../../components/Header';

test('header render', () => {
  const wrapper = shallow(<Header />);
  //expect(wrapper.find('h1').text()).toBe("Expensify");
  //expect(toJSON(wrapper)).toMatchSnapshot();
  expect(wrapper).toMatchSnapshot();
});
