import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {startLogout} from '../actions/auth';

export const Header = ({logout}) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button onClick={logout} className="button button--link">Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(startLogout())
});
export default connect(undefined, mapDispatchToProps)(Header);