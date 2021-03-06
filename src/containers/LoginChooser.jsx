import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import withRoot from './Home/modules/withRoot';


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
  buttons: {
    display: 'flex',
    margin: '20px',
    padding: '20px',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonAdmin: {
    margin: '20px',
    padding: '20px',
  },
  buttonClient: {
    margin: '20px',
    padding: '20px',
  },
}));

const LoginChooser = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <div className={classes.buttons}>
        <Button variant="contained" color="primary" className={classes.buttonAdmin}>
        <Link underline='none' href='/loginadmin' color='inherit'>
        Como Administrador
        </Link>
      </Button>
      <Button variant="contained" color="secondary" className={classes.buttonClient}>
      <Link underline='none' href='/logincliente' color='inherit'>
        Como Cliente
        </Link>
      </Button>
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
      </div>
    </Container>
  );
}

export default withRoot(LoginChooser);