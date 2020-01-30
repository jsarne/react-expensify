import {login, logout} from '../../actions/auth';

test('login redux action', () => {
  const uid = 'abc123';
  expect(login(uid)).toEqual({
    type: 'LOGIN',
    uid
  })
});

test('logout redux action', () => {
  expect(logout()).toEqual({
    type: 'LOGOUT'
  });
});