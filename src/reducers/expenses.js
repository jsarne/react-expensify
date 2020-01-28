const expensesReducerDefaultState = [];
export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(exp => exp.id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(exp => exp.id === action.id ? {...exp, ...action.edits} : exp);
    default: 
      return state;
  }
};
