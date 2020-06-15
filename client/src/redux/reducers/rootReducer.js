import authReducer from './authReducer';
import recipeReducer from './recipeReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  recipe: recipeReducer,
});

export default rootReducer;
