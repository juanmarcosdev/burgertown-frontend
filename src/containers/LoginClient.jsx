import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import withRoot from './Home/modules/withRoot';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_960_720.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
}));

const LoginClient = (props) => {
  const classes = useStyles();

  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(phone)
    console.log(password)
    const response = await fetch(`https://burgertown-backend.herokuapp.com/Cliente/Login/${phone}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ cliente_password: password })
    }).then(res => res.json()).then(data => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('typeUser', data.typeUser)
      if(localStorage.getItem('token') === 'undefined') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Inicio de sesión Cliente Fallido',
        })
      } else {
        fetch(`https://burgertown-backend.herokuapp.com/Cliente/${phone}`, {
      method: "GET",
      headers: { "Content-Type": "application/json"}
    }).then(res => res.json()).then(data => localStorage.setItem('cliente_id', data.data.cliente_id.toString()));
        Swal.fire(
          'Inicio de Sesión exitoso',
          'Iniciaste sesión como Cliente exitosamente',
          'success'
        )
        props.history.push('/menu');
      }
    })
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Iniciar Sesión como Cliente
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='phone'
              label='Celular'
              name='phone'
              autoComplete='phone'
              onChange={(event) => {setPhone(event.target.value)}}
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(event) => {setPassword(event.target.value)}}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Iniciar Sesión
            </Button>
          </form>
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='main'
            href='/'
          >
            Volver a la Página Principal
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRoot(LoginClient);