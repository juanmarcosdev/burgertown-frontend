import React from 'react';
import '../../../assets/styles/components/CarouselItem.css';
import carritoIcon from '../../../assets/static/plus-icon.png';
import viewProduct from '../../../assets/static/plus.png';

const CarouselItem = (props) => {
  const { categoria_id, producto_codigo, producto_descripcion, producto_descuento, producto_estado, producto_existencias, producto_imagen, producto_iva, producto_nombre, producto_precio } = props;
  return (
  <div className='carousel-item'>
    <img className='carousel-item__img' src={producto_imagen} alt='comida rica' />
    <div className='carousel-item__details'>
      <div>
        <img className='carousel-item__details--img' src={viewProduct} alt='view product' />
        <img className='carousel-item__details--img' src={carritoIcon} alt='Plus Icon' />
      </div>
      <p className='carousel-item__details--title'>{producto_nombre}</p>
      <p className='carousel-item__details--subtitle'>
        {producto_descripcion}
      </p>
    </div>
  </div>
)};

export default CarouselItem;