import axios from 'axios';

export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.token;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.get('http://localhost:5000/api/auth', config);

    dispatch({
      type: 'USER_LOADED_SUCCESS',
      payload: res.data,
    });
  } catch (error) {
    localStorage.removeItem('token');

    dispatch({
      type: 'USER_LOADED_FAILURE',
      payload: 'an error occured while trying to load the user',
    });
  }
};

export const signUp = (credentials) => async (dispatch) => {
  const body = credentials;

  try {
    const res = await axios.post('http://localhost:5000/api/users', body);
    const token = res.data.token;

    localStorage.setItem('token', token);

    dispatch({
      type: 'SIGN_UP_SUCCESS',
      payload: token,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: 'SIGN_UP_FAILURE',
      payload: 'an error occured while trying to sign up.',
    });
  }
};

export const signIn = (credentials) => async (dispatch) => {
  const body = credentials;

  try {
    const res = await axios.post('http://localhost:5000/api/auth', body);
    const token = res.data.token;

    localStorage.setItem('token', token);

    dispatch({
      type: 'SIGN_IN_SUCCESS',
      payload: res.data,
    });

    localStorage.setItem('token', token);

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: 'SIGN_IN_FAILURE',
      payload: 'an error occured while trying to sign in.',
    });
  }
};

export const signOut = () => async (dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: 'SIGN_OUT' });
};
