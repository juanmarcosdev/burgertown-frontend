import React from 'react';
import '../../../assets/styles/components/Categories.scss';

const Categories = ({ children, title }) => (
  <div className='categories'>
    {children}
  </div>
);

export default Categories;