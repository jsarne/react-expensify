import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// pair with <ExpenseListItem key={exp.id} expense={exp} /> in ExpenseList
// const ExpenseListItem = (props) => (
//   <div>
//     <h3>{props.expense.description}</h3>
//     <p>{props.expense.amount} - {props.expense.createdAt}</p>
//   </div>
// );
export const ExpenseListItem = ({id, description, amount, createdAt}) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__subtitle">{moment(createdAt).format('YYYY-MM-DD')}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount/100).format('$0,0.00')}</h3>
  </Link>
);

export default ExpenseListItem;