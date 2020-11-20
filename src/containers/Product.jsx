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
          <img className="drift-demo-trigger" src={dataProductoIndividual.producto_imagen} width="900" height="600" />
        </div>
    </div>
  
    <div className="column">
      <div className="details">
  <h1>{dataProductoIndividual.producto_nombre}</h1>
        <p className="price">$ {dataProductoIndividual.producto_precio} COP</p>
  <p className="description">{dataProductoIndividual.producto_descripcion}</p>
  
  
  
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);