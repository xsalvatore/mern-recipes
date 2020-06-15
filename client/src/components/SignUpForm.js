import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signUp } from '../redux/actions/authActions';

const SignUpForm = ({ authenticated, signUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  if (authenticated) {
    return <Redirect to='/recipes-gallery' />;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    signUp(formData);
  };

  return (
    <div className='sign-up-form-wrapper'>
      <div className='sign-up-form-container'>
        <header>
          <h1>Sign Up</h1>
        </header>

        <form onSubmit={onSubmit}>
          <div className='input-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
          </div>

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
            <button>Sign Up</button>
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
    signUp: (credentials) => dispatch(signUp(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
