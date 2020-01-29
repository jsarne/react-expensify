export default (expenses) => {
  if (expenses && expenses.length > 0) {
    return expenses.map((exp) => exp.amount).reduce((acc, amt) => acc+amt);
  } else {
    return 0;
  }
};