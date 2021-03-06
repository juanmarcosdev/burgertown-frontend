import React from 'react';
import '../../../assets/styles/components/CarouselItem.css';
import carritoIcon from '../../../assets/static/plus-icon.png';
import viewProduct from '../../../assets/static/plus.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendCarritoProducto } from '../../../actions';
import Swal from 'sweetalert2';
import Typography from '@material-ui/core/Typography';

const CarouselItem = (props) => {
  const { carritoCompras, categoria_id, producto_codigo, producto_descripcion, producto_descuento, producto_estado, producto_existencias, producto_imagen, producto_iva, producto_nombre, producto_precio } = props;
  const handleSetCart = (item, name) => {
    if(localStorage.typeUser === '1') {
      props.sendCarritoProducto(item);
      Swal.fire(
        'Producto añadido al carrito exitosamente!',
        `Añadiste el plato ${name} al carrito`,
        'success'
      )
    } else {
      Swal.fire(
        'No se pudo añadir el producto al carrito',
        `Recuerda que para poder añadir productos al carrito debes haber iniciado sesión como cliente`,
        'error'
      )
    }
  }
  return (
  <div className='carousel-item'>
    <img className='carousel-item__img' src={producto_imagen} alt='comida rica' />
    <div className='carousel-item__details'>
      <div>
        <Link to={`/product/${producto_codigo}`}>
        <img className='carousel-item__details--img' src={viewProduct} alt='view product' />
        </Link>
        <img className='carousel-item__details--img' src={carritoIcon} alt='Plus Icon' onClick={() => handleSetCart({'producto_codigo': producto_codigo, 'producto_nombre': producto_nombre, 'producto_imagen': producto_imagen, 'producto_precio': producto_precio, 'producto_descuento': producto_descuento, 'producto_iva': producto_iva}, producto_nombre)} />
      </div>
      <p className='carousel-item__details--title'>{producto_nombre}</p>
      <p className='carousel-item__details--subtitle'>
  { producto_descuento === 0 ? <Typography variant="subtitle2">$ {producto_precio} COP </Typography> : <div><Typography variant="overline"><div style={{textDecoration: 'line-through'}}>{producto_precio}</div></Typography><Typography variant="subtitle2">$ {producto_precio - (producto_precio * (producto_descuento / 100))} COP -  {producto_descuento} % OFF</Typography></div>}
      </p>
    </div>
  </div>
)};

const mapStateToProps = (state) => {
  return {
    carritoCompras: state.carritoCompras,
  }
}

const mapDispatchToProps = {
  sendCarritoProducto,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);