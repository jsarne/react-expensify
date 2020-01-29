import firedb from '../firebase/firebase';

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense: expense
});
export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id
});
export const editExpense = (id, edits) => ({
    type: 'EDIT_EXPENSE',
    id,
    edits
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description='', 
      note='', 
      amount=0, 
      createdAt=0
    } = expenseData;
    const exp = {description, note, amount, createdAt};

    return firedb.ref('expenses')
      .push(exp)
      .then((fireExp) => {
        dispatch(addExpense({id: fireExp.key, ...exp}));
      });
  };
};