import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2015/04/20/13/30/kitchen-731351_960_720.jpg)',
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

export default function LoginAdmin(props) {
  const classes = useStyles();

  const [document, setDocument] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://burgertown-backend.herokuapp.com/Trabajador/Login/${document}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ trabajador_password: password })
    }).then(res => res.json()).then(data => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('typeUser', data.typeUser)
      if(localStorage.getItem('token') === 'undefined') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Inicio de sesión Admin Fallido',
        })
      } else {
        Swal.fire(
          'Inicio de Sesión exitoso',
          'Iniciaste sesión como Admin exitosamente',
          'success'
        )
        props.history.push('/dashboardadmin');
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
            <SupervisorAccountOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Iniciar Sesión como Administrador
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='document'
              label='Número de documento'
              name='document'
              autoComplete='document'
              onChange={(event) => {setDocument(event.target.value)}}
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
