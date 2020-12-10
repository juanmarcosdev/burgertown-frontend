import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { setDireccionCliente, setMetodoPagar } from '../../actions';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Swal from 'sweetalert2';
import './Review.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Review = (props) => {
  const { dataDireccionCliente, dataPagar} = props;
  const classes = useStyles();

  const [dataSedeEnv, setDataSedeEnv] = React.useState({});
  const [dataMediosPago, setDataMediosPago] = React.useState([]);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const dateFormat = require('dateformat');



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [medioPago, setMedioPago] = React.useState('');
  const [cuotas, setCuotas] = React.useState('');
  const [porcentajePago, setPorcentajePago] = React.useState('');

  const [disablePrint, setDisablePrint] = React.useState('inline');

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Opciones de Pago disponibles</h2>
      <p id="simple-modal-description">
        Estas son tus opciones de pago disponibles para pagar el pedido:
      </p>
      <FormControl className={classes.formControl}>
      <Select
          labelId="select-medio-pago-label"
          id="select-medio-pago"
          value={medioPago}
          onChange={(event) => {
            setMedioPago(event.target.value)
          }}
        >
          <MenuItem value={0}>Efectivo</MenuItem>
          {
            dataMediosPago.map(item => <MenuItem value={item.tarjeta_id}>Tarjeta {item.tarjeta_tipo === 0 ? 'Débito' : 'Crédito'} {item.tarjeta_numero}</MenuItem>)
          }
        </Select>
      </FormControl>
      <p id="simple-modal-description">
        Seleccione número de cuotas (si es efectivo coloque 1 cuota):
      </p>
      <TextField value={cuotas} label="Cuotas"  onChange={(event) => {setCuotas(event.target.value)}}/>
      <p id="simple-modal-description">
        Seleccione el porcentaje a pagar (del total) con el medio de pago seleccionado:
      </p>
      <TextField value={porcentajePago} label="Porcentaje"  onChange={(event) => {setPorcentajePago(event.target.value)}}/>
      <div style={{marginTop: 20}}align="center">
      <Button variant="contained"
                    color="secondary"
                    onClick={() => {
                      // console.log(dateFormat(new Date(), "mm-dd-yyyy"))
                      let objectPago = {
                        pago_porcentaje_pedido: parseInt(porcentajePago),
                        pago_cuotas: parseInt(cuotas),
                        pago_fecha: dateFormat(new Date(), "mm-dd-yyyy"),
                        tarjeta_id: parseInt(medioPago) !== 0 ? parseInt(medioPago) : undefined,
                        pedido_id: parseInt(localStorage.pedido_id),
                        cliente_id: parseInt(localStorage.cliente_id),
                      }
                      console.log(JSON.parse(JSON.stringify(objectPago)))
                      props.setMetodoPagar(JSON.parse(JSON.stringify(objectPago)))
                    }}>
            Añadir
          </Button>
      </div>
    </div>
  );

  React.useEffect(() => {
    console.log(`https://burgertown-backend.herokuapp.com/Cliente/Metodos/${localStorage.cliente_id}`);
    fetch(`https://burgertown-backend.herokuapp.com/Cliente/Metodos/${localStorage.cliente_id}`, 
      {
        method: 'GET',
        headers: { "Content-Type": "application/json",
                   token: localStorage.token
                 },
      }).then(res => res.json())
        .then(data => {
          console.log(data.data)
          setDataMediosPago(data.data)
      })
  }, []);


  React.useEffect(() => {
    console.log(`https://burgertown-backend.herokuapp.com/Cliente/${localStorage.cliente_celular}`);
    fetch(`https://burgertown-backend.herokuapp.com/Cliente/${localStorage.cliente_celular}`, 
      {
        method: 'GET',
        headers: { "Content-Type": "application/json",
                   token: localStorage.token
                 },
      }).then(res => res.json())
        .then(data => {
          props.setDireccionCliente(data.data.cliente_direccion);
      })
  }, []);

  React.useEffect(() => {
    console.log(`https://burgertown-backend.herokuapp.com/Sede/${localStorage.sede_id}`);
    fetch(`https://burgertown-backend.herokuapp.com/Sede/${localStorage.sede_id}`, 
      {
        method: 'GET',
        headers: { "Content-Type": "application/json",
                   token: localStorage.token
                 },
      }).then(res => res.json())
        .then(data => {
          setDataSedeEnv(data.data)
      })
  }, []);

  const handlePay = async () => {
    let initialValue = 0;

    let sum = dataPagar.reduce(function (total, currentValue) {
        return total + currentValue.pago_porcentaje_pedido;
    }, initialValue);

    console.log(sum);
    console.log(dataPagar);
    if(sum === 100) {
      const response = await fetch(`https://burgertown-backend.herokuapp.com/Pedido/Pagar`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.token},
        body: JSON.stringify(dataPagar)
      })
      // console.log(response.status)
      if(response.status === 200) {
        Swal.fire(
          'Pedido pagado exitosamente',
          'Pedido pagado exitosamente!',
          'success'
        )
        setDisablePrint(false);
      } else {
        Swal.fire(
          'Error al pagar pedido',
          'Hubo un error pagando el pedido',
          'error'
        )
      }
    } else {
      Swal.fire(
        'No fue posible pagar el total del pedido',
        'La suma de los porcentajes de los medios de pago no da el total de la compra',
        'error'
      )
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen del pedido
      </Typography>
      <List disablePadding>
        {JSON.parse(localStorage.cantidad_productos_a_pagar).map((product) => (
          <ListItem className={classes.listItem} key={product.producto_nombre}>
            <ListItemText primary={product.producto_nombre} secondary={`Unidades: ${product.pedido_cp_cantidad} (Precio unitario: $ ${product.producto_precio} COP)`} />
            <Typography variant="body2">$ {product.pedido_cp_cantidad * product.producto_precio} COP</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="IVA" />
          <Typography variant="body2">
          $ {parseInt(JSON.parse(localStorage.total_a_pagar) * 0.16)} COP
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Subtotal sin IVA" />
          <Typography variant="body2">
          $ {parseInt(JSON.parse(localStorage.total_a_pagar) - JSON.parse(localStorage.total_a_pagar) * 0.16)} COP
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Envío" />
          <Typography variant="body2">
            Gratis
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $ {JSON.parse(localStorage.total_a_pagar)} COP
          </Typography>
        </ListItem>
      </List>
      <Grid container>
        <Grid>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Origen Envío (Sede desde donde se envía)
          </Typography>
        <Typography gutterBottom>{dataSedeEnv.sede_nombre}</Typography>
          <Typography gutterBottom>{dataSedeEnv.sede_direccion}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Dirección de Envío
          </Typography>
        <Typography gutterBottom>{localStorage.cliente_nombre_completo}</Typography>
          <Typography gutterBottom>{dataDireccionCliente}</Typography>
        </Grid>
      </Grid>
      <Grid>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Opciones de Pago
          </Typography>
          <table>
            <thead>
                <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: 17}}>
                  <td style={{margin: '30px'}}>Medio de Pago</td>
                  <td style={{margin: '30px'}}>Porcentaje</td>
                  <td style={{margin: '30px'}}>Porcentaje a pagar</td>
                </tr>
            </thead>
            <tbody>
              {
                dataPagar.filter(data => data.tarjeta_id === undefined).map(item => 
                  <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 17}}>
                    {
                      <td style={{margin: '30px'}}>Efectivo</td>
                    }
                    {
                      <td style={{margin: '30px'}}>{item.pago_porcentaje_pedido}%</td>
                    }
                    {
                      <td style={{margin: '30px'}}>$ {item.pago_porcentaje_pedido / 100 * parseInt(localStorage.total_a_pagar)} COP</td>
                    }
                  </tr>)
              }
              {
                dataMediosPago.filter(instance => dataPagar.some(e => e.tarjeta_id === instance.tarjeta_id)).map(item =>
                  <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 17}}>
                    {
                      <td style={{margin: '30px'}}>Tarjeta {item.tarjeta_tipo === 0 ? 'Débito' : 'Crédito'} {item.tarjeta_numero}</td>
                    }
                    {
                      <td style={{margin: '30px'}}>{dataPagar.filter(data => data.tarjeta_id === item.tarjeta_id)[0].pago_porcentaje_pedido}%</td>
                    }
                    {
                      <td style={{margin: '30px'}}>$ {dataPagar.filter(data => data.tarjeta_id === item.tarjeta_id)[0].pago_porcentaje_pedido / 100 * parseInt(localStorage.total_a_pagar)} COP</td>
                    }
                  </tr>)
              }
            </tbody>
          </table>
          <div align="center">
          <Button   
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}>
            Añadir Opcion de Pago
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
          </div>
          <div style={{marginTop: 20}} align="center">
          <Button   
                    variant="contained"
                    color="secondary"
                    onClick={handlePay}>
            Pagar todo y pedir
          </Button>
          </div>
          <div style={{marginTop: 20}} align="center">
          <Button   
                    disabled={disablePrint}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      window.print()
                    }}>
            Generar Factura PDF
          </Button>
          </div>
          <div style={{marginTop: 20}} align="center">
          <Link to="/">
          <Button   
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      localStorage.clear();
                    }}>
            Cerrar Sesión y volver a Landing Page
          </Button>
          </Link>
          </div>
        </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    dataDireccionCliente: state.dataDireccionCliente,
    dataPagar: state.dataPagar,
  }
}

const mapDispatchToProps = {
  setDireccionCliente,
  setMetodoPagar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);