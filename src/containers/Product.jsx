import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { getProductoIndividual } from '../actions';
import '../assets/styles/components/Product.css';
import withRoot from './Home/modules/withRoot';

const Product = (props) => {
  const { match } = props;
  const productId = match.params.productId;
  const { dataProductoIndividual } = props;

  React.useEffect(() => {
    fetch(`https://burgertown-backend.herokuapp.com/Producto/${productId}`, 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        props.getProductoIndividual(data.data)
    })
  }, []);


  return (
      <div>
    <div id="header">
    <img src="https://awik.io/demo/webshop-zoom/star_logo.png" />
    </div>
  
  <div className="columns">
  
    <div className="column">
        <div className="thumbnail-container">
          <img className="drift-demo-trigger" src={dataProductoIndividual.producto_imagen} width="10000" height="600" />
        </div>
    </div>
  
    <div className="column">
      <div className="details">
  <Typography variant="h4" gutterBottom>{dataProductoIndividual.producto_nombre}</Typography>
  <Typography variant="h6" gutterBottom><p className="price">{dataProductoIndividual.producto_descuento === 0 ? <Typography variant="h6">$ {dataProductoIndividual.producto_precio} COP </Typography> : <div><Typography variant="h6"><div style={{textDecoration: 'line-through'}}>{dataProductoIndividual.producto_precio}</div></Typography><Typography variant="h6">$ {dataProductoIndividual.producto_precio - (dataProductoIndividual.producto_precio * (dataProductoIndividual.producto_descuento / 100))} COP -  {dataProductoIndividual.producto_descuento} % OFF</Typography></div>}</p></Typography>
        <Typography variant="subtitle2" gutterBottom><p className="description">{dataProductoIndividual.producto_descripcion}</p></Typography>
  
  
  
        <div className="columns2">
          <Button id="backMenu" variant="contained" color="secondary" href='/menu'>
            Volver al Menú
          </Button>
        </div>
      </div>
    </div>
  
  </div>
  </div>
  );
}

const mapStateToProps = (state) => {
    return {
        dataProductoIndividual: state.dataProductoIndividual,
    }
}

const mapDispatchToProps = {
    getProductoIndividual,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(Product));