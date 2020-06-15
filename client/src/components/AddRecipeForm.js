import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { uploadRecipe } from '../redux/actions/recipeActions';

const SignUpForm = ({ history, authenticated, uploadRecipe }) => {
  const [formData, setFormData] = useState({
    image: '',
    category: '',
    title: '',
    ingredients: '',
    directions: '',
  });

  const { category, title, ingredients, directions } = formData;

  if (!authenticated) {
    return <Redirect to='/sign-in' />;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await uploadRecipe(formData);

    history.push('/recipes-gallery');
  };

  // might be best to move this method to the back-end
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
    <div className='add-recipe-form-wrapper'>
      <div className='add-recipe-form-container'>
        <header>
          <h1>Add Recipe</h1>
        </header>

        <form onSubmit={onSubmit}>
          <div className='input-group'>
            <label htmlFor='image'>Image</label>
            <input
              type='file'
              name='image'
              onChange={uploadImage}
              required
              accept='.png, .jpg, .jpeg'
            />
          </div>

          <div className='input-group'>
            <label htmlFor='category'>Category</label>
            <input
              type='text'
              name='category'
              value={category}
              onChange={onChange}
              placeholder='What kind of recipe is it ?'
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              value={title}
              onChange={onChange}
              placeholder='What is the name of recipe ?'
              required
            />
          </div>

          <div className='input-group with-textarea'>
            <label htmlFor='ingredients'>Ingredients</label>
            <textarea
              type='text'
              name='ingredients'
              value={ingredients}
              onChange={onChange}
              rows='5'
              placeholder='Enter each ingredients separated by an asteriks. For example: 1 table spoon of sugar*2 table spoon of milk'
              required
            />
          </div>

          <div className='input-group with-textarea'>
            <label htmlFor='directions'>Directions</label>
            <textarea
              type='text'
              name='directions'
              value={directions}
              onChange={onChange}
              placeholder='Enter each directions separent by an asteriks. For example: Boil water for 5 minutes*Add sugar'
              rows='5'
              required
            />
          </div>

          <div className='submit-button'>
            <button>Add</button>
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
    uploadRecipe: (formData) => dispatch(uploadRecipe(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
