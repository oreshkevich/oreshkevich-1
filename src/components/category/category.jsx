import React from 'react';
import { useParams } from 'react-router-dom';

import './category.scss';

function Category() {
  const { name } = useParams();

  return <h2 className='category-name'>{name}</h2>;
}

export { Category };
