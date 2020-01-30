import {firedb} from '../firebase/firebase';

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense: expense
});
export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description='', 
      note='', 
      amount=0, 
      createdAt=0
    } = expenseData;
    const exp = {description, note, amount, createdAt};

    return firedb.ref(`users/${uid}/expenses`)
      .push(exp)
      .then((fireExp) => {
        dispatch(addExpense({id: fireExp.key, ...exp}));
      });
  };
};

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id
});
export const startRemoveExpense = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return firedb.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense(id));
    });
  }
};

export const editExpense = (id, edits) => ({
    type: 'EDIT_EXPENSE',
    id,
    edits
});
export const startEditExpense = (id, edits) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return firedb.ref(`users/${uid}/expenses/${id}`).update(edits).then(() => {
      dispatch(editExpense(id, edits));
    });
  }
};

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});
export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return firedb.ref(`users/${uid}/expenses`)
      .once('value')
      .then((fireExp) => {
        const storeExp = [];
        fireExp.forEach((fe) => {
          storeExp.push({id: fe.key, ...fe.val()});
        });
        dispatch(setExpenses(storeExp));
      });
  }
};
