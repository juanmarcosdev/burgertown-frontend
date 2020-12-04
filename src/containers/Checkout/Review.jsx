import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { setDireccionCliente } from '../../actions';



const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

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
}));

const Review = (props) => {
  const { dataDireccionCliente } = props;
  const classes = useStyles();



  React.useEffect(() => {
    console.log(`http://burgertown-backend.herokuapp.com/Cliente/${localStorage.cliente_celular}`);
    fetch(`http://burgertown-backend.herokuapp.com/Cliente/${localStorage.cliente_celular}`, 
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
        </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    dataDireccionCliente: state.dataDireccionCliente,
  }
}

const mapDispatchToProps = {
  setDireccionCliente,
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);