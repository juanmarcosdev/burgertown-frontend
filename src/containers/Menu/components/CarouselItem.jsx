import React from 'react';
import '../../../assets/styles/components/CarouselItem.css';
import plusIcon from '../../../assets/static/plus-icon.png';

const CarouselItem = (
  // { cover, title, year, contentRating, duration }
  ) => (
  <div className='carousel-item'>
    <img className='carousel-item__img' src='https://cdn.pixabay.com/photo/2017/09/22/19/05/casserole-dish-2776735_960_720.jpg' alt='comida rica' />
    <div className='carousel-item__details'>
      <div>
        <img className='carousel-item__details--img' src={plusIcon} alt='Plus Icon' />
      </div>
      <p className='carousel-item__details--title'>Plato delicioso</p>
      <p className='carousel-item__details--subtitle'>
        {`Deliciosa comida`}
      </p>
    </div>
  </div>
);

export default CarouselItem;