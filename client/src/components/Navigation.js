import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../redux/actions/authActions';

const Navigation = ({ authenticated, signOut }) => {
  const [toggled, setToggled] = useState(false);

  const SignedInLinks = () => (
    <Fragment>
      <li>
        <NavLink to='/recipes-gallery'>Recipes Gallery</NavLink>
      </li>
      <li>
        <NavLink to='/add-recipe'>Add Recipe</NavLink>
      </li>
      <li>
        {/* eslint-disable-next-line */}
        <a href='/sign-in' className='sign-out-link' onClick={signOut}>
          Sign Out
        </a>
      </li>
    </Fragment>
  );

  const SignedOutLinks = () => (
    <Fragment>
      <li>
        <NavLink to='/sign-up'>Sign Up</NavLink>
      </li>
      <li>
        <NavLink to='/sign-in'>Sign In</NavLink>
      </li>
    </Fragment>
  );

  const handleToggle = (e) => {
    setToggled(!toggled);
  };

  return (
    <Fragment>
      <div className={`navigation-wrapper ${toggled ? 'visible' : 'hidden'}`}>
        <div className='navigation-container'>
          <div className='branding'>
            <h1>Co.</h1>
          </div>

          <nav className='menu-wrapper'>
            <ul className='menu-container'>
              {authenticated ? <SignedInLinks /> : <SignedOutLinks />}
            </ul>
          </nav>
        </div>
      </div>

      <div className='menu-mobile-toggle'>
        <button onClick={handleToggle} className='toggle-button'>
          =
        </button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
