import 'date-fns';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import BusinessIcon from '@material-ui/icons/Business';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import 'dateformat';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
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

const ModifySede = ({ match }) => {
  const classes = useStyles();
  const sedeId = match.params.sedeId;
  

  const dateFormat = require('dateformat');

  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [selectedDate1, setSelectedDate1] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());

  React.useEffect(() => {
    fetch(`https://burgertown-backend.herokuapp.com/Sede/${sedeId}`, 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        console.log(data.data)
        setName(data.data.sede_nombre)
        setAddress(data.data.sede_direccion)
        setCity(data.data.sede_ciudad)
        console.log(data.data.sede_horario_apertura)
        console.log(parseInt(data.data.sede_horario_apertura.substring(0,2)))
        console.log(parseInt(data.data.sede_horario_apertura.substring(3,5)))
        console.log(parseInt(data.data.sede_horario_apertura.substring(6,8)))
        selectedDate1.setHours(parseInt(data.data.sede_horario_apertura.substring(0,2)))
        selectedDate1.setMinutes(parseInt(data.data.sede_horario_apertura.substring(3,5)))
        selectedDate1.setSeconds(parseInt(data.data.sede_horario_apertura.substring(6,8)))
        setSelectedDate1(new Date(selectedDate1.getDate(), selectedDate1.getMonth(), selectedDate1.getDay(), selectedDate1.getHours(), selectedDate1.getMinutes(), selectedDate1.getSeconds()))
        // ---
        console.log(data.data.sede_horario_cierre)
        console.log(parseInt(data.data.sede_horario_cierre.substring(0,2)))
        console.log(parseInt(data.data.sede_horario_cierre.substring(3,5)))
        console.log(parseInt(data.data.sede_horario_cierre.substring(6,8)))
        selectedDate2.setHours(parseInt(data.data.sede_horario_cierre.substring(0,2)))
        selectedDate2.setMinutes(parseInt(data.data.sede_horario_cierre.substring(3,5)))
        selectedDate2.setSeconds(parseInt(data.data.sede_horario_cierre.substring(6,8)))
        setSelectedDate2(new Date(selectedDate2.getDate(), selectedDate2.getMonth(), selectedDate2.getDay(), selectedDate2.getHours(), selectedDate2.getMinutes(), selectedDate2.getSeconds()))
      })
  }, []);

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  


  const handleSubmit = async (event) => {
    const now = new Date();
    const nowFormat = dateFormat(now, "hh:MM TT");
    event.preventDefault();
    const newSede = {
        sede_nombre: name,
        sede_direccion: address,
        sede_ciudad: city,
        sede_horario_apertura: dateFormat(selectedDate1, "hh:MM TT"),
        sede_horario_cierre: dateFormat(selectedDate2, "hh:MM TT"),
    }
    console.log(JSON.stringify(newSede));
    const response = await fetch(`https://burgertown-backend.herokuapp.com/Sede/Edit/${sedeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: localStorage.token},
      body: JSON.stringify(newSede)
    })
    if(response.status === 200) {
      Swal.fire(
        'Sede modificada',
        'Sede modificada exitosamente!',
        'success'
      )
    } else {
      Swal.fire(
        'Error al modificar sede',
        'Hubo un error modificando la sede',
        'error'
      )
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BusinessIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Modificar Sede con ID {sedeId}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                value={city}
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
            Modificar Sede
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

export default withRoot(withRouter(ModifySede));