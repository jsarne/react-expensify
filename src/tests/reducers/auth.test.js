import authReducer from '../../reducers/auth';

test('login reducer sets uid', () => {
  const action = {type: 'LOGIN', uid: 'abc123'};
  const state = authReducer({}, action);
  expect(state).toEqual({uid: action.uid});
});

test('logout reducer clears uid', () => {
  const action = {type: 'LOGOUT'};
  const state = authReducer({uid: 'abc123'}, action);
  expect(state).toEqual({});
});