import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../assets/styles/components/CarritoCompra.css';
import { addIdProductoLlevar, addCantidadProductoLlevar } from '../actions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const CarritoCompra = (props) => {
    const { idProductosALlevar, cantidadProductosALlevar } = props;
    const [arrayPrecios, setArrayPrecios] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [cantidad, setCantidad] = React.useState(1);
    const [ready, setReady] = React.useState(false);
    return (
        <div>
            <header className="container">
            <h1>Carrito de Compra</h1>

            <ul className="breadcrumb">
                <li>Menu</li>
                <li>Carrito de Compra</li>
            </ul>
         </header>
         <section className="container">
      <ul className="products">
        {JSON.parse(localStorage.getItem("shopping_cart")).map((product) => {
          return (
            <li className="row" key={product.producto_codigo}>
              <div className="col left">
                <div className="thumbnail">
                  <a href="#">
                    <img src={product.producto_imagen} alt={product.producto_nombre} />
                  </a>
                </div>
                <div className="detail">
                  <div className="name">
                    <a href="#">{product.producto_nombre}</a>
                  </div>
                  <div className="description">{product.producto_descripcion}</div>
                  <div className="price">$ {product.producto_precio} COP</div>
                </div>
              </div>

              <div className="col right">
                <div className="quantity">
                <TextField
                id="outlined-number"
                label="Cantidad"
                type="number"
                defaultValue={cantidad}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={(event) => {setCantidad(event.target.value)}}
                />
                <Button variant="contained" color="primary" 
                onClick={() => {props.addIdProductoLlevar(product.producto_codigo);
                    props.addCantidadProductoLlevar(cantidad);
                    setArrayPrecios([...arrayPrecios, product.producto_precio]);
                    // console.log(idProductosALlevar);
                    // console.log(cantidadProductosALlevar);
                }}
                // onClick={handleConfirm(product.producto_codigo, cantidad)}
                >
                Confirmar Cantidad
                </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button size="large" variant="contained" color="primary" onClick={() => {
                  let counter = 0;
                  for(let i = 0; i < idProductosALlevar.length; i++) {
                      counter = counter + (cantidadProductosALlevar[i] * arrayPrecios[i])
                  }
                  setTotal(counter);
                  setReady(true);
          }}>Mostrar Detalle</Button>
      </div>
      {
          ready && <div>
          <div>
          <Typography variant="h6" gutterBottom>
            TOTAL A PAGAR: $ {total} COP
          </Typography>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button size="large" variant="contained" color="secondary"
          onClick={() => {
              localStorage.setItem("id_productos_a_pagar", JSON.stringify(idProductosALlevar))
              localStorage.setItem("cantidad_productos_a_pagar", JSON.stringify(cantidadProductosALlevar))
              localStorage.setItem("total_a_pagar", total.toString());
          }}>Ir a pagar</Button>
          </div>
          </div>
      }
    </section>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      idProductosALlevar: state.idProductosALlevar,
      cantidadProductosALlevar: state.cantidadProductosALlevar,
    }
}

const mapDispatchToProps = {
    addIdProductoLlevar, 
    addCantidadProductoLlevar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarritoCompra);