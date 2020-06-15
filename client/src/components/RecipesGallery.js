import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getRecipes } from '../redux/actions/recipeActions';

// eslint-disable-next-line
import RecipeThumb from './RecipeThumb';

const RecipesGallery = ({ authenticated, recipes, user, getRecipes }) => {
  useEffect(() => {
    if (user) {
      getRecipes();
    }
    // eslint-disable-next-line
  }, [getRecipes, user]);

  if (!authenticated && !user) {
    return <Redirect to='/sign-in' />;
  }

  return (
    <div className='recipes-gallery-wrapper'>
      <div className='recipes-gallery-container'>
        <header>
          <h1>Recipes Gallery</h1>
        </header>

        <div className='thumbnails'>
          {recipes.length === 0 && <p>There is no recipes currently</p>}

          {recipes.map((recipe) => {
            return <RecipeThumb key={recipe._id} recipe={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    recipes: state.recipe.recipes,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipes: () => dispatch(getRecipes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesGallery);
