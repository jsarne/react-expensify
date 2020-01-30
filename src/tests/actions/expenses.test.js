import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, startEditExpense, startRemoveExpense, startSetExpenses,
        addExpense, editExpense, removeExpense, setExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import {firedb} from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expData = {};
  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expData[id] = {description, note, amount, createdAt};
  });
  // use set to replace existing expenses for each test case
  firedb.ref('expenses').set(expData).then(() => done());
});

test('remove redux object', () => {
  const id = '123abc';
  const action = removeExpense(id);
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: id
  });
});

test('edit redux object', () => {
  const id = '234def';
  const edits = {note: 'mah new note', amount: 23400};
  expect(editExpense(id, edits)).toEqual({
    type: 'EDIT_EXPENSE',
    id: id,
    edits: edits
  })
});

test('add redux object', () => {
  expect(addExpense(expenses[2])).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('set redux object', () => {
  expect(setExpenses(expenses)).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should add exp to db and redux', (done) => {
  const store = createMockStore({});
  // eslint-disable-next-line no-unused-vars
  const {id, ...expData} = expenses[1];  // discard ID - action doesn't expect it, firedb/mock redux don't return fixture value

  // promise chained from startAddExpense() in actions/expenses.js
  store.dispatch(startAddExpense(expData)).then(() => {
    // check mock redux store
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {id: expect.any(String), ...expData}
    });
    // check firebase db
    return firedb.ref(`expenses/${action.expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expData);
    done();
  });
});

test('should add exp w/defaults to db and redux', (done) => {
  const store = createMockStore({});
  const defaultExpData = {description: '', note: '', createdAt: 0, amount: 0};

  // promise chained from startAddExpense() in actions/expenses.js
  store.dispatch(startAddExpense({})).then(() => {
    // check actions sent to mock redux store
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {id: expect.any(String), ...defaultExpData}
    });
    // check firebase db
    return firedb.ref(`expenses/${action.expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpData);
    done();
  });
});

test('should fetch from firebase', (done) => {
  const store = createMockStore();
  store.dispatch(startSetExpenses()).then(() => {
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses  // i.e. fixture data
    });
    done();
  }).catch((err) => {console.log(err)});
});

test('should remove exp from db and redux', (done) => {
  const store = createMockStore({});
  const {id} = expenses[1];

  store.dispatch(startRemoveExpense(id)).then(() => {
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return firedb.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(null);
    done();
  });
});

test('should edit exp in db and redux', (done) => {
  const store = createMockStore({});
  const {id} = expenses[1];
  const edits = {description: 'my new desc', amount: '99999'};

  store.dispatch(startEditExpense(id, edits)).then(() => {
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      edits
    });
    return firedb.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    const newExp = snapshot.val();
    expect(newExp.description).toEqual(edits.description);
    expect(newExp.amount).toEqual(edits.amount);
    done();
  });
});