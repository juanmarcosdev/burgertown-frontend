import React from 'react';
import '../../../assets/styles/components/Categories.css';

const Categories = ({ children, title }) => (
  <div className='categories'>
    {children}
  </div>
);

export default Categories;