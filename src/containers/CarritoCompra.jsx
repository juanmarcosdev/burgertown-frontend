import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../assets/styles/components/CarritoCompra.css';
import { setSedesDespliegue, addIdProductoLlevar, addCantidadProductoLlevar } from '../actions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import withRoot from './Home/modules/withRoot';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CarritoCompra = (props) => {
    const [sede, setSede] = React.useState('');
    const classes = useStyles();
    const { idProductosALlevar, cantidadProductosALlevar, dataSedesDespliegue } = props;
    React.useEffect(() => {
      fetch('http://burgertown-backend.herokuapp.com/Sede/Get', 
        {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                     token: localStorage.token
                   },
        }).then(res => res.json())
          .then(data => {
            props.setSedesDespliegue(data.data);
        })
    }, []);
    const [arrayPrecios, setArrayPrecios] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    let cantidad = 0;
    const [ready, setReady] = React.useState(false);
    return (
        <div>
            <header className="container">
            <Typography variant="h3" gutterBottom>Carrito de Compra</Typography>

            <ul className="breadcrumb">
                <li>Menu</li>
                <li>Carrito de Compra</li>
            </ul>
         </header>
         <section className="container">
           <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
           <Typography variant="h6" gutterBottom>
            Selecciona la Sede en la que quieres comprar
          </Typography>
           <FormControl className={classes.formControl}>
         <InputLabel id="demo-simple-select-label">Sede</InputLabel>
         <Select
          labelId="select-sede-label"
          id="select-sede"
          value={sede}
          onChange={(event) => {setSede(event.target.value)}}
        >
          {
            dataSedesDespliegue.map(item => <MenuItem value={item.sede_id}>{item.sede_nombre}</MenuItem>)
          }
        </Select>
        </FormControl>
           </div>
      <ul className="products">
        {JSON.parse(localStorage.getItem("shopping_cart")).map((product) => {
          return (
            <li className="row" key={product.producto_codigo}>
              <div className="col left">
                <div className="thumbnail">
                  <a href={`/product/${product.producto_codigo}`}>
                    <img src={product.producto_imagen} alt={product.producto_nombre} />
                  </a>
                </div>
                <div className="detail">
                  <div className="name">
                    <Typography variant="h6" gutterBottom><a href={`/product/${product.producto_codigo}`}>{product.producto_nombre}</a></Typography>
                  </div>
                  <div className="price">
                    {/* <Typography variant="h6" gutterBottom>$ {product.producto_precio} COP</Typography> */}
                    { product.producto_descuento === 0 ? <Typography variant="subtitle2">$ {product.producto_precio} COP </Typography> : <div><Typography variant="overline"><div style={{textDecoration: 'line-through'}}>{product.producto_precio}</div></Typography><Typography variant="subtitle2">$ {product.producto_precio - (product.producto_precio * (product.producto_descuento / 100))} COP -  {product.producto_descuento} % OFF</Typography></div>}
                    </div>
                </div>
              </div>

              <div className="col right">
                <div className="quantity">
                <TextField
                id="outlined-number"
                label="Cantidad"
                type="number"
                defaultValue="1"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={(event) => {cantidad = event.target.value}}
                />
                <Button variant="contained" color="secondary" 
                onClick={() => {props.addIdProductoLlevar(product.producto_codigo);
                    props.addCantidadProductoLlevar({"producto_codigo": product.producto_codigo, "pedido_cp_cantidad": parseInt(cantidad)});
                    if(product.producto_descuento === 0) {
                      setArrayPrecios([...arrayPrecios, product.producto_precio]);
                    } else {
                      setArrayPrecios([...arrayPrecios, product.producto_precio - (product.producto_precio * (product.producto_descuento/100))]);
                    }
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
                      counter = counter + (cantidadProductosALlevar[i].pedido_cp_cantidad * arrayPrecios[i])
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
              localStorage.setItem("sede_id", sede);
              console.log(JSON.stringify({ 'sede_id': parseInt(localStorage.getItem("sede_id")), 'cliente_id': parseInt(localStorage.getItem("cliente_id")) }))
              fetch('https://burgertown-backend.herokuapp.com/Pedido/Create', 
        {
          method: 'POST',
          headers: { "Content-Type": "application/json",
                     token: localStorage.token
                   },
          body: JSON.stringify({ 'sede_id': parseInt(localStorage.getItem("sede_id")), 'cliente_id': parseInt(localStorage.getItem("cliente_id")) })
        }).then(res => res.json())
          .then(data => {
            console.log(data.message);
            console.log(data.data.pedido_id);
            localStorage.setItem("pedido_id", data.data.pedido_id.toString());
            let tripletaProductoCantidadPedido = JSON.parse(localStorage.getItem("cantidad_productos_a_pagar"))
        for(let i = 0; i < tripletaProductoCantidadPedido.length; i++) {
          tripletaProductoCantidadPedido[i].pedido_id = parseInt(localStorage.getItem("pedido_id"))
        }
        console.log(tripletaProductoCantidadPedido)
        fetch('https://burgertown-backend.herokuapp.com/Pedido/AgregarProducto', 
        {
          method: 'POST',
          headers: { "Content-Type": "application/json",
                     token: localStorage.token
                   },
          body: JSON.stringify(tripletaProductoCantidadPedido)
        }).then(res => res.json())
          .then(data => {
            console.log(data.message);
        })
        })
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
      dataSedesDespliegue: state.dataSedesDespliegue,
    }
}

const mapDispatchToProps = {
    addIdProductoLlevar, 
    addCantidadProductoLlevar,
    setSedesDespliegue,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(CarritoCompra));