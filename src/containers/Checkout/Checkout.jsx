import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Review from './Review';
import withRoot from '../Home/modules/withRoot';
import logo from '../../assets/static/burgertown_logo.png';

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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  left: {
    flex: 1,
  },
}));



const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const dateFormat = require('dateformat');



  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="secondary" className={classes.appBar}>
        <Toolbar>
            <img style={{marginRight: 20}}src={logo} alt='logo' width='60' height='60'/>
          <Typography variant="h6" color="inherit" noWrap>
            BurgerTown
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Typography component="h2" variant="h6" align="center">
            Pedido #{localStorage.pedido_id}
          </Typography>
          <div>
          <Typography align="center">
            BurgerTown Restaurantes
          </Typography>
          <Typography align="center">
            NIT 800.196.261-3
          </Typography>
          <Typography align="center">
            +57 (2) 3212100
          </Typography>
          <Typography align="center">
          {dateFormat(new Date(), "dd-mm-yyyy hh:MM TT")}
          </Typography>
          </div>
          <React.Fragment>
            <Review />
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

export default withRoot(Checkout);