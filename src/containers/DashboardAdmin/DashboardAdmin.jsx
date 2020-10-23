import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './components/listItems';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { getTrabajadores, deleteTrabajadores, activateTrabajador, getClientes, deleteClientes, activateCliente } from '../../actions';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import WorkIcon from '@material-ui/icons/Work';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import CategoryIcon from '@material-ui/icons/Category';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AssignmentIcon from '@material-ui/icons/Assignment';



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
  const { dataTrabajadores, dataClientes } = props;
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

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Trabajador/Get')
      .then(res => res.json())
      .then(data => {props.getTrabajadores(data.data)})
  }, []);

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Cliente/Get')
      .then(res => res.json())
      .then(data => {props.getClientes(data.data)})
  }, []);

  const handleUpdateTrabajadores = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Trabajador/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json"},
    })
    props.deleteTrabajadores(id);
  }

  const handleActivateTrabajador = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Trabajador/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json"},
    })
    await fetch(`https://burgertown-backend.herokuapp.com/Trabajador/${id}`)
      .then(res => res.json())
      .then(data => props.activateTrabajador(data.data))
  }

  // Clientes

  const handleUpdateClientes = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Cliente/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json"},
    })
    props.deleteClientes(id);
  }

  const handleActivateCliente = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Cliente/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json"},
    })
    await fetch(`https://burgertown-backend.herokuapp.com/Cliente/${id}`)
      .then(res => res.json())
      .then(data => props.activateCliente(data.data))
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
          <div id='trabajadores'>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <WorkIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Trabajadores</h2>
            </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<CloudUploadIcon />} href='/createworker'>
              CREAR TRABAJADOR
            </Button>
            <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<PersonAddIcon />}
            onClick={() => Swal.fire({
              title: 'Inserte ID de trabajador a activar',
              input: 'number',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Activar',
              showLoaderOnConfirm: true,
              preConfirm: (id) => {
                handleActivateTrabajador(id)
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire('Trabajador activado', '', 'success')
              }
            })}>
              ACTIVAR TRABAJADOR MEDIANTE ID
            </Button>
          </div>
          <table>
            <thead>
              <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: 17}}>
                <td style={{margin: '10px'}}>Foto</td>
                <td style={{margin: '10px'}}>ID</td>
                <td style={{margin: '10px'}}>Documento</td>
                <td style={{margin: '10px'}}>Nombre</td>
                <td style={{margin: '10px'}}>Apellido</td>
                <td style={{margin: '10px'}}>Celular</td>
                <td style={{margin: '10px'}}>Fecha contratacion</td>
                <td style={{margin: '10px'}}>Cargo</td>
                <td style={{margin: '10px'}}>Dirección</td>
            </tr>
            </thead>
            <tbody>
              {
                dataTrabajadores.length > 0 ? dataTrabajadores.filter((item) => item.trabajador_estado === 1).map((item) => 
                <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 17}}>
                  {
                    <td style={{margin: '14px'}} key={item.trabajador_id}>{item.trabajador_foto}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.trabajador_id}>{item.trabajador_id}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.trabajador_documento}>{item.trabajador_documento}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.trabajador_nombre}>{item.trabajador_nombre}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.trabajador_apellido}>{item.trabajador_apellido}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.trabajador_celular}>{item.trabajador_celular}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.trabajador_contratacion}>{item.trabajador_contratacion}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.trabajador_cargo}>{item.trabajador_cargo}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.trabajador_direccion}>{item.trabajador_direccion}</td>
                  }
                  {
                    <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={{margin: '7px 14px 7px 14px'}}
                    onClick={() => Swal.fire({
                      title: 'Deseas desactivar el Trabajador?',
                      showCancelButton: true,
                      confirmButtonText: `Desactivar`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleUpdateTrabajadores(item.trabajador_id)
                        Swal.fire('Trabajador desactivado', '', 'success')
                      }
                    })}
                  >
                    Desactivar
                  </Button>
                  }
                  {
                    <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SaveIcon />}
                    style={{margin: '7px 14px 7px 14px'}}
                    href={`/modifyworker/${item.trabajador_id}`}
                  >
                    Modificar
                  </Button>
                  }
                  </tr>
                ) 
                : <div></div>
              }
            </tbody>
          </table>
          </div>
          <div id='clientes'>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <AccountCircleIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Clientes</h2>
            </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<CloudUploadIcon />} href='/createclient'>
              CREAR CLIENTE
            </Button>
            <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<PersonAddIcon />}
            onClick={() => Swal.fire({
              title: 'Inserte ID de cliente a activar',
              input: 'number',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Activar',
              showLoaderOnConfirm: true,
              preConfirm: (id) => {
                handleActivateCliente(id)
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire('Cliente activado', '', 'success')
              }
            })}>
              ACTIVAR CLIENTE MEDIANTE ID
            </Button>
          </div>
          <table>
            <thead>
              <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: 17}}>
                <td style={{margin: '18px'}}>ID</td>
                <td style={{margin: '18px'}}>Documento</td>
                <td style={{margin: '18px'}}>Nombre</td>
                <td style={{margin: '18px'}}>Apellido</td>
                <td style={{margin: '18px'}}>Celular</td>
                <td style={{margin: '18px'}}>Fecha nacimiento</td>
                <td style={{margin: '18px'}}>Dirección</td>
            </tr>
            </thead>
            <tbody>
              {
                dataClientes.length > 0 ? dataClientes.filter((item) => item.cliente_estado === 1).map((item) => 
                <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 17}}>
                  {
                    <td style={{margin: '14px'}} key={item.cliente_id}>{item.cliente_id}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.cliente_documento}>{item.cliente_documento}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.cliente_nombre}>{item.cliente_nombre}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.cliente_apellido}>{item.cliente_apellido}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.cliente_celular}>{item.cliente_celular}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.cliente_fecha_nacimiento}>{item.cliente_fecha_nacimiento}</td>
                  }
                  {
                    <td style={{margin: '14px'}} key={item.cliente_direccion}>{item.cliente_direccion}</td>
                  }
                  {
                    <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={{margin: '7px 14px 7px 14px'}}
                    onClick={() => Swal.fire({
                      title: 'Deseas desactivar el Cliente?',
                      showCancelButton: true,
                      confirmButtonText: `Desactivar`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleUpdateClientes(item.cliente_id)
                        Swal.fire('Cliente desactivado', '', 'success')
                      }
                    })}
                  >
                    Desactivar
                  </Button>
                  }
                  {
                    <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SaveIcon />}
                    style={{margin: '7px 14px 7px 14px'}}
                    href={`/modifyclient/${item.client_id}`}
                  >
                    Modificar
                  </Button>
                  }
                  </tr>
                ) 
                : <div></div>
              }
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
    dataClientes: state.dataClientes,
  }
}

const mapDispatchToProps = {
  getTrabajadores,
  deleteTrabajadores,
  activateTrabajador,
  getClientes,
  deleteClientes,
  activateCliente,
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAdmin);