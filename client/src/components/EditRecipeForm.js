import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getRecipe, editRecipe } from '../redux/actions/recipeActions';

const EditRecipeForm = ({
  authenticated,
  match,
  recipe,
  getRecipe,
  editRecipe,
  history,
}) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    image: '',
    category: '',
    title: '',
    ingredients: '',
    directions: '',
  });

  useEffect(() => {
    if (authenticated) {
      getRecipe(match.params.id);
    }
  }, [getRecipe, authenticated, match.params.id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await editRecipe(formData);

    history.push('/recipes-gallery');
  };

  if (!authenticated && !recipe) return <Redirect to='/sign-in' />;

  // might need some refactoring, not sure if loading is needed
  if (recipe && loading === true) {
    setFormData({
      id: recipe._id,
      image: recipe.image,
      title: recipe.title,
      category: recipe.category,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
    });
    setLoading(false);
  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'recipes-application');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dm7t9a83u/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const file = await res.json();

    setFormData({
      ...formData,
      image: file.secure_url,
    });
  };

  return (
    <div className='edit-recipe-form-wrapper'>
      <div className='edit-recipe-form-container'>
        {recipe && (
          <Fragment>
            <header>
              <h1>Edit Recipe</h1>
            </header>

            <form onSubmit={onSubmit}>
              <div className='input-group'>
                <label htmlFor='image'>Image</label>
                <input type='file' name='image' onChange={uploadImage} />
              </div>

              <div className='input-group'>
                <label htmlFor='category'>Category</label>
                <input
                  type='text'
                  name='category'
                  value={formData.category}
                  onChange={onChange}
                  required
                />
              </div>

              <div className='input-group'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={onChange}
                  required
                />
              </div>

              <div className='input-group with-textarea'>
                <label htmlFor='ingredients'>Ingredients</label>
                <textarea
                  type='text'
                  name='ingredients'
                  value={formData.ingredients}
                  onChange={onChange}
                  required
                  rows='5'
                />
              </div>

              <div className='input-group with-textarea'>
                <label htmlFor='directions'>Directions</label>
                <textarea
                  type='text'
                  name='directions'
                  value={formData.directions}
                  onChange={onChange}
                  required
                  rows='5'
                />
              </div>

              <div className='submit-button'>
                <button>Edit</button>
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe.recipe,
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipe: (id) => dispatch(getRecipe(id)),
    editRecipe: (recipe) => dispatch(editRecipe(recipe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipeForm);
