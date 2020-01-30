import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {startLogout} from '../actions/auth';

export const Header = ({logout}) => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink to="/create" activeClassName="is-active">Add Expense</NavLink>
    <button onClick={logout}>Logout</button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(startLogout())
});
export default connect(undefined, mapDispatchToProps)(Header);