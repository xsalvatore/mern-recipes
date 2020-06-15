import React from 'react';
import { Link } from 'react-router-dom';

const RecipeThumb = ({ recipe }) => {
  const { _id, title, image } = recipe;

  return (
    <Link to={`/single-recipe/${_id}`} className='thumb'>
      <p>{title}</p>
      <img src={image} alt='' />
    </Link>
  );
};

export default RecipeThumb;
