import axios from 'axios';

export const uploadRecipe = (formData) => async (dispatch) => {
  try {
    const token = localStorage.token;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.post(
      'http://localhost:5000/api/recipes',
      formData,
      config
    );

    dispatch({
      type: 'UPLOAD_RECIPE_SUCCESS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'UPLOAD_RECIPE_FAILURE',
      payload: 'an error occured while trying to upload the recipe',
    });
  }
};

export const getRecipes = () => async (dispatch) => {
  try {
    const token = localStorage.token;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.get('http://localhost:5000/api/recipes', config);

    dispatch({
      type: 'GET_RECIPES_SUCCESS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_RECIPES_FAILURE',
      payload: 'an error occured while trying to upload the recipe',
    });
  }
};

export const getRecipe = (id) => async (dispatch) => {
  try {
    const token = localStorage.token;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.get(
      `http://localhost:5000/api/recipes/${id}`,
      config
    );

    dispatch({
      type: 'GET_RECIPE_SUCCESS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_RECIPE_FAILURE',
      payload: 'an error occured while trying to fetch the recipe',
    });
  }
};

export const editRecipe = (recipe) => async (dispatch) => {
  try {
    const token = localStorage.token;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const body = recipe;

    const id = recipe.id;

    const res = await axios.post(
      `http://localhost:5000/api/recipes/edit/${id}`,
      body,
      config
    );

    dispatch({ type: 'EDIT_TRANSACTION_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({
      type: 'EDIT_RECIPE_FAILURE',
      payload: 'an error occured while trying to edit the recipe',
    });
  }
};

export const deleteRecipe = (recipe) => async (dispatch) => {
  try {
    const token = localStorage.token;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const id = recipe._id;

    await axios.delete(`http://localhost:5000/api/recipes/${id}`, config);

    // dispatch would go here (shouldn't be needed)
    // ...
  } catch (error) {
    // dispatch would go here (shouldn't be needed)
    // ...
  }
};
