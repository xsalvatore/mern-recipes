const INIT_STATE = {
  errors: '',
  recipe: null,
  recipes: [],
};

const recipeReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    // done
    case 'UPLOAD_RECIPE_SUCCESS':
      return {
        ...state,
        errors: '',
        transaction: null,
        transactions: [payload, ...state.transactions],
      };

    // done
    case 'GET_RECIPES_SUCCESS':
      return {
        ...state,
        errors: null,
        recipe: null,
        recipes: payload,
      };

    // done
    case 'GET_RECIPE_SUCCESS':
      return {
        ...state,
        errors: '',
        recipe: payload,
      };

    // done
    case 'EDIT_RECIPE_SUCCESS':
      return {
        ...state,
        error: '',
      };

    // done
    case 'UPLOAD_RECIPE_FAILURE':
      return {
        ...state,
        error: payload,
      };

    // done
    case 'GET_RECIPES_FAILURE':
      return {
        ...state,
        error: payload,
      };

    // done
    case 'GET_RECIPE_FAILURE':
      return {
        ...state,
        error: payload,
      };

    // done
    case 'EDIT_RECIPE_FAILURE':
      return {
        ...state,
        error: payload,
      };

    // done
    default:
      return state;
  }
};

export default recipeReducer;
