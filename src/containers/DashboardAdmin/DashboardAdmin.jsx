import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './components/listItems';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { getTrabajadores, resetTrabajadores } from '../../actions';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const DashboardAdmin = (props) => {
  const { dataTrabajadores } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const Swal = require('sweetalert2');

  const handleGetTrabajadores = () => {
    props.resetTrabajadores()
    fetch('https://burgertown-backend.herokuapp.com/Trabajador/Get')
      .then(res => res.json())
      .then(data => props.getTrabajadores(data))
  }



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Panel de Administrador
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          {/* Relleno */}
          <div id='trabajadores'>
          <h2>Trabajadores</h2>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{margin: '5px'}} onClick={() => handleGetTrabajadores()} variant="contained" color="primary">
              CONSULTAR TRABAJADORES
            </Button>
            <Button style={{margin: '5px'}} variant="contained" color="secondary">
              CREAR TRABAJADOR
            </Button>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          </div>
          <table>
            <thead>
              <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 20}}>
                <td style={{margin: '10px'}}>ID</td>
                <td style={{margin: '10px'}}>Documento</td>
                <td style={{margin: '10px'}}>Nombre</td>
                <td style={{margin: '10px'}}>Apellido</td>
                <td style={{margin: '10px'}}>Celular</td>
                <td style={{margin: '10px'}}>Fecha contratacion</td>
                <td style={{margin: '10px'}}>Cargo</td>
                <td style={{margin: '10px'}}>Dirección</td>
                <td style={{margin: '10px'}}>Estado</td>
            </tr>
            </thead>
            <tbody>
            <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', fontSize: 14}}>
              {
                dataTrabajadores.length > 0 ? dataTrabajadores[0].data.map((item) => <td style={{margin: '12px'}} key={item.trabajador_id}>{item.trabajador_id}</td>) : <div></div>
              }
              {
                dataTrabajadores.length > 0 ? dataTrabajadores[0].data.map((item) => <td style={{margin: '12px'}} key={item.trabajador_id}>{item.trabajador_documento}</td>) : <div></div>
              }
              {
                dataTrabajadores.length > 0 ? dataTrabajadores[0].data.map((item) => <td style={{margin: '12px'}} key={item.trabajador_id}>{item.trabajador_nombre}</td>) : <div></div>
              }
              {
                dataTrabajadores.length > 0 ? dataTrabajadores[0].data.map((item) => <td style={{margin: '12px'}} key={item.trabajador_id}>{item.trabajador_apellido}</td>) : <div></div>
              }
              {
                dataTrabajadores.length > 0 ? dataTrabajadores[0].data.map((item) => <td style={{margin: '12px'}} key={item.trabajador_id}>{item.trabajador_celular}</td>) : <div></div>
              }
              {
                dataTrabajadores.length > 0 ? dataTrabajadores[0].data.map((item) => <td style={{margin: '12px'}} key={item.trabajador_id}>{item.trabajador_contratacion}</td>) : <div></div>
              }
              {
                dataTrabajadores.length > 0 ? dataTrabajadores[0].data.map((item) => <td style={{margin: '12px'}} key={item.trabajador_id}>{item.trabajador_cargo}</td>) : <div></div>
              }
              {
                dataTrabajadores.length > 0 ? dataTrabajadores[0].data.map((item) => <td style={{margin: '12px'}} key={item.trabajador_id}>{item.trabajador_direccion}</td>) : <div></div>
              }
              {
                dataTrabajadores.length > 0 ? dataTrabajadores[0].data.map((item) => <td style={{margin: '12px'}} key={item.trabajador_id}>{item.trabajador_estado === 1 ? `Activo` : `Inactivo`}</td>) : <div></div>
              }
              </tr>
            </tbody>
          </table>
          </div>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataTrabajadores: state.dataTrabajadores,
  }
}

const mapDispatchToProps = {
  getTrabajadores,
  resetTrabajadores,
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAdmin);