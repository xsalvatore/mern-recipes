import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import RecipesGallery from './components/RecipesGallery';
import AddRecipeForm from './components/AddRecipeForm';
import SingleRecipe from './components/SingleRecipe';
import EditRecipeForm from './components/EditRecipeForm';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <div className='app-container'>
          <Navigation />
          <Switch>
            <Route exact path='/sign-up' component={SignUpForm} />
            <Route exact path='/sign-in' component={SignInForm} />
            <Route exact path='/recipes-gallery' component={RecipesGallery} />
            <Route exact path='/add-recipe' component={AddRecipeForm} />
            <Route exact path='/single-recipe/:id' component={SingleRecipe} />
            <Route exact path='/edit-recipe/:id' component={EditRecipeForm} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
