import 'date-fns';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import withRoot from './Home/modules/withRoot';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import DateFnsUtils from '@date-io/date-fns';
import 'dateformat';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { getMediosPago } from '../actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://burgertown-frontend.herokuapp.com/">
        BurgerTown
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const MediosPago = (props) => {
  const { dataMediosPago, match } = props;
  const clientId = match.params.idCliente;

  React.useEffect(() => {
    fetch(`https://burgertown-backend.herokuapp.com/Cliente/Metodos/${clientId}`, 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        props.getMediosPago(data.data)
        console.log(data.data)
      })
  }, []);

  const classes = useStyles();

  const dateFormat = require('dateformat');

  const [cardNumber, setCardNumber] = React.useState('');
  const [cvcNumber, setCVCNumber] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [tipoTarjeta, setTipoTarjeta] = React.useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const vencimientoFormat = dateFormat(selectedDate, "yyyy-mm-dd");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTarjeta = {
      tarjeta_numero: cardNumber,
      tarjeta_cvc: parseInt(cvcNumber),
      tarjeta_vencimiento: vencimientoFormat,
      tarjeta_tipo: tipoTarjeta === "0" ? 0 : 1,
      cliente_id: parseInt(clientId),
    }
    console.log(newTarjeta);
      const response = await fetch(`https://burgertown-backend.herokuapp.com/Cliente/Tarjeta/Add`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    token: localStorage.token
                  },
        body: JSON.stringify(newTarjeta)
      })
      if(response.status === 200) {
        Swal.fire(
          'Tarjeta agregada',
          'Tarjeta agregada exitosamente!',
          'success'
        )
        fetch(`https://burgertown-backend.herokuapp.com/Cliente/Metodos/${clientId}`, 
        {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                    token: localStorage.token
                  },
        }).then(res => res.json())
          .then(data => {
            props.getMediosPago(data.data)
            console.log(data.data)
        })
      } else {
        Swal.fire(
          'Error al agregar tarjeta',
          'Hubo un error agregando la tarjeta',
          'error'
        )
      }
    }
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreditCardIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Medios de Pago asociados al cliente con ID {clientId}
        </Typography>
        <div>
        <table>
              <thead>
                <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: 17}}>
                  <td style={{marginLeft: '60px', marginRight: '60px'}}>Número de tarjeta</td>
                  <td style={{marginLeft: '60px', marginRight: '60px'}}>CVC</td>
                  <td style={{marginLeft: '60px', marginRight: '60px'}}>Fecha de vencimiento</td>
                  <td style={{marginLeft: '60px', marginRight: '60px'}}>Tipo</td>
              </tr>
              </thead>
              <tbody>
                {
                  dataMediosPago.length > 0 ? dataMediosPago.map((item) => 
                  <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 17}}>
                    {
                      <td style={{margin: '14px'}} key={item.tarjeta_numero}>{item.tarjeta_numero}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.tarjeta_cvc}>{item.tarjeta_cvc}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.tarjeta_vencimiento}>{item.tarjeta_vencimiento}</td>
                    }
                    {
                      <td key={item.tarjeta_tipo}>{item.tarjeta_tipo === 0 ? <p>Débito</p> : <p>Crédito</p>}</td>
                    }
                    </tr>
                  ) 
                  : <div></div>
                }
              </tbody>
            </table>
        </div>
        <Typography component="h6" variant="h6">
          Añadir Nuevo Medio de Pago
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cardnumber"
            label="Número de tarjeta"
            name="cardnumber"
            autoComplete="cardnumber"
            autoFocus
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cvc"
            label="CVC"
            name="cvc"
            autoComplete="cvc"
            autoFocus
            value={cvcNumber}
            onChange={(event) => setCVCNumber(event.target.value)}
          />
          <Grid container justify="space-around">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="fechavencimiento"
          label="Fecha de vencimiento"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
      <Grid>
      <FormControl className={classes.formControl}>
         <InputLabel id="demo-simple-select-label">Tipo de tarjeta</InputLabel>
         <Select
          labelId="select-sede-label"
          id="select-sede"
          value={tipoTarjeta}
          onChange={(event) => {
            setTipoTarjeta(event.target.value)
          }}
        >
         <MenuItem value="0">Débito</MenuItem>
         <MenuItem value="1">Crédito</MenuItem>
        </Select>
        </FormControl>
      </Grid>
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Asociar Nuevo Medio de Pago
          </Button>
        </form>
        <div>
        <Button
        fullWidth
        variant="contained"
        color="secondary"
        href='/menu'
          >
            Volver al Menú
          </Button>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    dataMediosPago: state.dataMediosPago,
  }
}

const mapDispatchToProps = {
  getMediosPago,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(MediosPago));