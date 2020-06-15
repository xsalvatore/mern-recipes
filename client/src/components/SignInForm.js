import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signIn } from '../redux/actions/authActions';

const SignInForm = ({ authenticated, signIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  if (authenticated) {
    return <Redirect to='/recipes-gallery' />;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    signIn(formData);
  };

  return (
    <div className='sign-in-form-wrapper'>
      <div className='sign-in-form-container'>
        <header>
          <h1>Sign In</h1>
        </header>

        <form onSubmit={onSubmit}>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <div className='submit-button'>
            <button>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
