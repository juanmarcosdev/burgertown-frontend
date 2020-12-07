import 'date-fns';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import 'dateformat';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import withRoot from '../Home/modules/withRoot';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ModifyClient = ({ match }) => {
  const classes = useStyles();
  const clientId = match.params.clientId;
  

  const dateFormat = require('dateformat');

  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [document, setDocument] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  React.useEffect(() => {
    fetch(`https://burgertown-backend.herokuapp.com/Cliente/${localStorage.clienteCelularModify}`, 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        console.log(data.data)
        setName(data.data.cliente_nombre)
        setSurname(data.data.cliente_apellido)
        setPhone(data.data.cliente_celular)
        setDocument(data.data.cliente_documento)
        setAddress(data.data.cliente_direccion)
        setPhoto(data.data.cliente_foto)
        setSelectedDate(Date.parse(data.data.cliente_fecha_nacimiento))
      })
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const birthdayFormat = dateFormat(selectedDate, "dd-mm-yyyy");
  

  const handleSubmit = async (event) => {
    const now = new Date();
    const nowFormat = dateFormat(now, "dd-mm-yyyy");
    event.preventDefault();
    const newClient = {
      cliente_documento: document,
      cliente_nombre: name,
      cliente_apellido: surname,
      cliente_celular: phone,
      cliente_direccion: address,
      cliente_password: (password !== '' ? password : undefined),
      cliente_fecha_nacimiento: dateFormat(selectedDate, "yyyy-mm-dd"),
      cliente_foto: photo,
    }
    console.log(JSON.stringify(newClient));
    const response = await fetch(`https://burgertown-backend.herokuapp.com/Cliente/Edit/${clientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: localStorage.token},
      body: JSON.stringify(newClient)
    })
    if(response.status === 200) {
      Swal.fire(
        'Cliente modificado',
        'Cliente modificado exitosamente!',
        'success'
      )
    } else {
      Swal.fire(
        'Error al modificar cliente',
        'Hubo un error modificando el cliente',
        'error'
      )
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Modificar Cliente con ID {clientId}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={name}
                autoComplete="nombre"
                name="nombre"
                variant="outlined"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                onChange={(event) => {setName(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={surname}
                variant="outlined"
                required
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                autoComplete="apellido"
                onChange={(event) => {setSurname(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={phone}
                variant="outlined"
                required
                fullWidth
                id="celular"
                label="Celular"
                name="celular"
                autoComplete="celular"
                onChange={(event) => {setPhone(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={document}
                variant="outlined"
                required
                fullWidth
                id="documento"
                label="Documento"
                name="documento"
                autoComplete="documento"
                onChange={(event) => {setDocument(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={address}
                variant="outlined"
                required
                fullWidth
                id="direccion"
                label="Dirección"
                name="direccion"
                autoComplete="direccion"
                onChange={(event) => {setAddress(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={photo}
                variant="outlined"
                required
                fullWidth
                id="photo"
                label="photo"
                name="photo"
                autoComplete="photo"
                onChange={(event) => {setPhoto(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {setPassword(event.target.value)}}
              />
            </Grid>
            <Grid container justify="space-around">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="fechanacimiento"
          label="Fecha de nacimiento"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Modificar Cliente
          </Button>
        </form>
        <Button
            type='button'
            fullWidth
            variant='contained'
            color='main'
            href='/dashboardadmin'
          >
            Volver a Panel de Administración
          </Button>
      </div>
    </Container>
  );
}

export default withRoot(withRouter(ModifyClient));