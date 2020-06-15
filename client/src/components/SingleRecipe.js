import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getRecipe, deleteRecipe } from '../redux/actions/recipeActions';

const SingleRecipe = ({
  getRecipe,
  deleteRecipe,
  authenticated,
  recipe,
  match,
  history,
}) => {
  useEffect(() => {
    if (authenticated) {
      getRecipe(match.params.id);
    }
  }, [getRecipe, authenticated, match.params.id]);

  if (!authenticated && !recipe) return <Redirect to='/sign-in' />;

  const formatedIngredients = () => {
    const ingredients = recipe.ingredients.split('*');

    console.log(ingredients);

    return (
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        ))}
      </ul>
    );
  };

  const formatedDirections = () => {
    const directions = recipe.directions.split('*');

    return (
      <ul>
        {directions.map((direction, i) => (
          <li key={i}>{direction}</li>
        ))}
      </ul>
    );
  };

  const onDelete = async (e) => {
    e.preventDefault();

    await deleteRecipe(recipe);

    history.push('/recipes-gallery');
  };

  return (
    <div className='single-recipe-wrapper'>
      {recipe && (
        <div className='single-recipe-container'>
          <header>
            <h1>{recipe.title}</h1>
          </header>

          <div className='button-group'>
            <Link to={`/edit-recipe/${recipe._id}`}>
              <button>Edit</button>
            </Link>
            <button className='delete' onClick={onDelete}>
              Delete
            </button>
          </div>

          <img src={recipe.image} alt='' />

          <div className='body'>
            <div className='ingredients'>
              <h3>Ingredients</h3>
              {formatedIngredients()}
            </div>

            <div className='directions'>
              <h3>Directions</h3>
              {formatedDirections()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    recipe: state.recipe.recipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipe: (id) => dispatch(getRecipe(id)),
    deleteRecipe: (recipe) => dispatch(deleteRecipe(recipe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
