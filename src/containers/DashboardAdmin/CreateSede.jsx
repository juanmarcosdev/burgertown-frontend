import 'date-fns';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import 'dateformat';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from '@material-ui/pickers';

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

export default function CreateSede() {
  const classes = useStyles();
  

  const dateFormat = require('dateformat');

  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [selectedDate1, setSelectedDate1] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  const hora1 = dateFormat(selectedDate1, "hh:MM TT");
  const hora2 = dateFormat(selectedDate2, "hh:MM TT");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newSede = {
        sede_nombre: name,
        sede_direccion: address,
        sede_ciudad: city,
        sede_horario_apertura: hora1,
        sede_horario_cierre: hora2,
    }
    console.log(newSede);
    const response = await fetch(`https://burgertown-backend.herokuapp.com/Sede/Create`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(newSede)
    })
    console.log(response.status)
    console.log(response.statusText)
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear Sede
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
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
            <Grid item xs={12}>
              <TextField
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
                autoComplete="ciudad"
                name="ciudad"
                variant="outlined"
                required
                fullWidth
                id="ciudad"
                label="Ciudad"
                onChange={(event) => {setCity(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid container justify="space-around">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
            margin="normal"
            id="horaapertura"
            label="Horario de Apertura"
            value={selectedDate1}
            onChange={handleDateChange1}
            KeyboardButtonProps={{
                'aria-label': 'change time',
            }}
        />
        <KeyboardTimePicker
            margin="normal"
            id="horacierre"
            label="Horario de Cierre"
            value={selectedDate2}
            onChange={handleDateChange2}
            KeyboardButtonProps={{
                'aria-label': 'change time',
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
            Crear Sede
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