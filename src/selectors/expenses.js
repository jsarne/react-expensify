import moment from 'moment';

export default (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((exp) => {
    const createdAtMmoent = moment(exp.createdAt);
    const descTextFound = exp.description.toLowerCase().includes(text.toLowerCase());
    const startDateInRange = startDate ? startDate.isSameOrBefore(createdAtMmoent, 'day') : true;
    const endDateInRange = endDate ? endDate.isSameOrAfter(createdAtMmoent, 'day') : true

    return descTextFound && startDateInRange && endDateInRange;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;  // larger createdAt - i.e. more recent - first
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1; // larger amount first
    }
  });
};