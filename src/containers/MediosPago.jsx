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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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
  const { match } = props;
  const clientId = match.params.idCliente;
  const classes = useStyles();

  const dateFormat = require('dateformat');

  const [cardNumber, setCardNumber] = React.useState('');
  const [cvcNumber, setCVCNumber] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [tipoTarjeta, setTipoTarjeta] = React.useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dateToday = new Date();
  const formatedToday = dateFormat(dateToday, "yyyy-mm-dd");

  const birthdayFormat = dateFormat(selectedDate, "yyyy-mm-dd");

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
          <p>Medios de Pago</p>
        </div>
        <Typography component="h6" variant="h6">
          Añadir Nuevo Medio de Pago
        </Typography>
        <form className={classes.form} noValidate onSubmit={(event) => event.preventDefault()}>
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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRoot(MediosPago);