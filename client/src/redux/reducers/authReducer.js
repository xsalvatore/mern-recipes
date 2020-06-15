const INIT_STATE = {
  authenticated: null,
  errors: '',
  token: localStorage.getItem('token'),
  user: null,
};

const authReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    // done
    case 'USER_LOADED_SUCCESS':
      return {
        ...state,
        authenticated: true,
        user: payload,
      };

    // done
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        authenticated: true,
        errors: '',
        user: payload,
      };

    // done
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        authenticated: true,
        errors: '',
        user: payload,
      };

    // done
    case 'USER_LOADED_FAILURE':
      return {
        ...state,
        errors: payload,
      };

    // done
    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        errors: payload,
      };

    // done
    case 'SIGN_IN_FAILURE':
      return {
        ...state,
        errors: payload,
      };

    // done
    case 'SIGN_OUT':
      return {
        ...state,
        authenticated: false,
        errors: '',
        token: null,
        user: null,
      };

    // done
    default:
      return state;
  }
};

export default authReducer;
