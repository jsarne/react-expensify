import React from 'react';
import {Link} from 'react-router-dom';

// pair with <ExpenseListItem key={exp.id} expense={exp} /> in ExpenseList
// const ExpenseListItem = (props) => (
//   <div>
//     <h3>{props.expense.description}</h3>
//     <p>{props.expense.amount} - {props.expense.createdAt}</p>
//   </div>
// );
export const ExpenseListItem = ({id, description, amount, createdAt}) => (
  <div>
    <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
    <p>{amount} - {createdAt}</p>
  </div>
);

export default ExpenseListItem;