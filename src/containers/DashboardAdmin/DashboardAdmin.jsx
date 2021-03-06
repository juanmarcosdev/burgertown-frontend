import React from 'react';
import 'date-fns';
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
import { getTrabajadores, deleteTrabajadores, activateTrabajador, 
         getClientes, deleteClientes, activateCliente, 
         getCategorias, deleteCategorias, activateCategoria, 
         getSedes, deleteSedes, activateSede,
         getProductos, deleteProductos, activateProducto } from '../../actions';
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
import NotFound from '../NotFound';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import withRoot from '../Home/modules/withRoot';
import { Bar, Pie } from '@reactchartjs/react-chart.js';
import DateFnsUtils from '@date-io/date-fns';
import 'dateformat';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';


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
  const backgroundArrayColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(63, 189, 0, 0.2)',
    'rgba(151, 0, 201, 0.2)',
    'rgba(246, 255, 0, 0.2)',
    'rgba(255, 0, 0, 0.2)',
    'rgba(255, 153, 0, 0.2)',
    'rgba(255, 251, 120, 0.2)',
    'rgba(200, 225, 73, 0.2)',
    'rgba(60, 51, 187, 0.2)',
    'rgba(126, 75, 77, 0.2)',
    'rgba(141, 247, 155, 0.2)',
    'rgba(249, 108, 185, 0.2)',
    'rgba(218, 116, 8, 0.2)',
    'rgba(57, 195, 158, 0.2)',
    'rgba(31, 33, 104, 0.2)',
  ];
  const borderArrayColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(63, 189, 0, 1)',
    'rgba(151, 0, 201, 1)',
    'rgba(246, 255, 0, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(255, 153, 0, 1)',
    'rgba(255, 251, 120, 1)',
    'rgba(200, 225, 73, 1)',
    'rgba(60, 51, 187, 1)',
    'rgba(126, 75, 77, 1)',
    'rgba(141, 247, 155, 1)',
    'rgba(249, 108, 185, 1)',
    'rgba(218, 116, 8, 1)',
    'rgba(57, 195, 158, 1)',
    'rgba(31, 33, 104, 1)',
  ];
  const { dataTrabajadores, dataClientes, dataCategorias, dataSedes, dataProductos, history } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [selectedDate1, setSelectedDate1] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());
  const dateFormat = require('dateformat');

  const [idPedidoReporte, setIdPedidoReporte] = React.useState('');

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  const Swal = require('sweetalert2');

  // componentDidMount()
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  

  const [dataReporte1, setDataReporte1] = React.useState([])

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Reportes/ProductosMasVendidos', 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        setDataReporte1(data.data)
        console.log(data.data)
      })
  }, []);

  const dataChartReporte1 = {
    labels: dataReporte1.map(a => a.producto_nombre),
    datasets: [
      {
        label: '# de Ventas',
        data: dataReporte1.map(a => a.total_ventas),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      },
    ],
  }

  const [dataReporte2, setDataReporte2] = React.useState([])

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Reportes/MejoresClientes', 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        setDataReporte2(data.data)
        console.log(data.data)
      })
  }, []);

  const dataChartReporte2 = {
    labels: dataReporte2.map(a => a.cliente_nombre),
    datasets: [
      {
        label: 'Cantidad de Dinero ingresado',
        data: dataReporte2.map(a => a.contribucion),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      },
    ],
  }

  const [dataReporte4, setDataReporte4] = React.useState([])

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Reportes/ProductosMenosVendidos', 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        setDataReporte4(data.data)
        console.log(data.data)
      })
  }, []);

  const dataChartReporte4 = {
    labels: dataReporte4.map(a => a.producto_nombre),
    datasets: [
      {
        label: '# de Ventas',
        data: dataReporte4.map(a => a.total_ventas),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      },
    ],
  }

  const [dataReporte6, setDataReporte6] = React.useState([])

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Reportes/MejoresSedes', 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        setDataReporte6(data.data)
        console.log(data.data)
      })
  }, []);

  const dataChartReporte6 = {
    labels: dataReporte6.map(a => a.sede_nombre),
    datasets: [
      {
        label: 'Dinero ingresado por sede',
        data: dataReporte6.map(a => a.ventas_sede),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      },
    ],
  }

  const [dataReporte7, setDataReporte7] = React.useState([])

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Reportes/PeoresSedes', 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        setDataReporte7(data.data)
        console.log(data.data)
      })
  }, []);

  const dataChartReporte7 = {
    labels: dataReporte7.map(a => a.sede_nombre),
    datasets: [
      {
        label: 'Dinero ingresado por sede',
        data: dataReporte7.map(a => a.ventas_sede),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      },
    ],
  }

  const mapNumberToMonth = number => {
    switch(number) {
      case '01':
        return 'Enero';
      case '02':
        return 'Febrero';
      case '03':
        return 'Marzo';
      case '04':
        return 'Abril';
      case '05':
        return 'Mayo';
      case '06':
        return 'Junio';
      case '07':
        return 'Julio';
      case '08':
        return 'Agosto';
      case '09':
        return 'Septiembre';
      case '10':
        return 'Octubre';
      case '11':
        return 'Noviembre';
      case '12':
        return 'Diciembre';
      default:
        return 'No valido';
    }
  }

  const changeDate = fecha => {
    return fecha.substring(5,7)
  }

  const [valueIDProducto, setValueIDProducto] = React.useState('');

  const [dataReporte5, setDataReporte5] = React.useState([]);

  const handleReporteMesesProducto = async () => {
    console.log(valueIDProducto);
    const response = await fetch(`https://burgertown-backend.herokuapp.com/Reportes/Ventas_producto/${valueIDProducto}`, 
              {
                method: 'GET',
                headers: { "Content-Type": "application/json",
                          token: localStorage.token,
                        },
              }).then(res => res.json())
                .then(data => {
                  console.log("reporte 5")
                  console.log(data.data)
                  setDataReporte5(data.data)
                })
  }

  


  const [dataReporte3, setDataReporte3] = React.useState([]);

  const handleReporteVenta = async () => {
    console.log(selectedDate1)
              console.log(selectedDate2)
              console.log(dateFormat(selectedDate1, "dd-mm-yyyy"))
              console.log(dateFormat(selectedDate2, "dd-mm-yyyy"))
              console.log(JSON.stringify({
                fecha_inicial: dateFormat(selectedDate1, "dd-mm-yyyy"),
                fecha_final: dateFormat(selectedDate2, "dd-mm-yyyy"),
              }))
              const response = await fetch('https://burgertown-backend.herokuapp.com/Reportes/Ventas_Fecha', 
              {
                method: 'PUT',
                headers: { "Content-Type": "application/json",
                          token: localStorage.token,
                        },
                body: JSON.stringify({
                  fecha_inicial: dateFormat(selectedDate1, "dd-mm-yyyy"),
                  fecha_final: dateFormat(selectedDate2, "dd-mm-yyyy"),
                })
              }).then(res => res.json())
                .then(data => {
                  console.log("reporte 3")
                  console.log(data.data)
                  setDataReporte3(data.data)
                  
                })
  }

  const [dataReporte8, setDataReporte8] = React.useState([])

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Reportes/Proximos_cumpleaneros', 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        setDataReporte8(data.data)
        console.log(data.data)
      })
  }, []);

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Trabajador/Get', 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        props.getTrabajadores(data.data)
        console.log(data.data)
      })
  }, []);

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Cliente/Get',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    })
      .then(res => res.json())
      .then(data => {
        props.getClientes(data.data)
        console.log(data.data)})
  }, []);

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Categoria/Get',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    })
      .then(res => res.json())
      .then(data => {props.getCategorias(data.data)})
  }, []);

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Sede/Get',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    })
      .then(res => res.json())
      .then(data => {props.getSedes(data.data)})
  }, []);

  React.useEffect(() => {
    fetch('https://burgertown-backend.herokuapp.com/Producto/Get',
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    })
      .then(res => res.json())
      .then(data => {props.getProductos(data.data)})
  }, []);

  // Trabajadores

  const handleUpdateTrabajadores = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Trabajador/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    props.deleteTrabajadores(id);
  }

  const handleActivateTrabajador = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Trabajador/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    await fetch(`https://burgertown-backend.herokuapp.com/Trabajador/${id}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
      .then(res => res.json())
      .then(data => props.activateTrabajador(data.data))
  }

  // Clientes

  const handleUpdateClientes = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Cliente/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    props.deleteClientes(id); 
  }

  const handleActivateCliente = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Cliente/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    await fetch(`https://burgertown-backend.herokuapp.com/Cliente/${id}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
      .then(res => res.json())
      .then(data => props.activateCliente(data.data))
  }

  // Categorias

  const handleUpdateCategorias = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Categoria/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    props.deleteCategorias(id)
  }

  const handleActivateCategoria = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Categoria/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    await fetch(`https://burgertown-backend.herokuapp.com/Categoria/${id}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
      .then(res => res.json())
      .then(data => props.activateCategoria(data.data))
  }

  // Sedes

  const handleUpdateSedes = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Sede/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    props.deleteSedes(id)
  }

  const handleActivateSede = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Sede/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    await fetch(`https://burgertown-backend.herokuapp.com/Sede/${id}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
      .then(res => res.json())
      .then(data => props.activateSede(data.data))
  }

  // Productos

  const handleUpdateProductos = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Producto/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    props.deleteProductos(id)
  }

  const handleActivateProducto = async (id) => {
    await fetch(`https://burgertown-backend.herokuapp.com/Producto/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
    await fetch(`https://burgertown-backend.herokuapp.com/Producto/${id}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json", token: localStorage.token},
    })
      .then(res => res.json())
      .then(data => props.activateProducto(data.data))
  }


  return (
    <div>
      {
        localStorage.token !== undefined && localStorage.typeUser === '2' ?
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
            <IconButton color="inherit">
            <Badge color="secondary" onClick={() => {
                Swal.fire({
                  title: 'Deseas cerrar sesión?',
                  showDenyButton: true,
                  confirmButtonText: `Cerrar Sesión`,
                  denyButtonText: `NO Cerrar Sesión`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.clear();
                    Swal.fire('Cerraste sesión exitosamente', '', 'success')
                    history.push('/');
                  } else if (result.isDenied) {
                    Swal.fire('No cerraste sesión', '', 'error')
                  }
                })
              }}>
              <ExitToAppIcon />
            </Badge>
          </IconButton>
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
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
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
                      <td style={{margin: '14px'}} key={item.trabajador_foto}><img src={item.trabajador_foto} alt={item.trabajador_nombre} width="40" height="40"></img></td>
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
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
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
                  <td td style={{margin: '18px'}}>Foto</td>
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
                      <td style={{margin: '14px'}} key={item.cliente_foto}><img src={item.cliente_foto} alt={item.cliente_nombre} width="40" height="40"></img></td>
                    }
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
                      
                    </Button>
                    }
                    {
                      <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<SaveIcon />}
                      style={{margin: '7px 14px 7px 14px'}}
                      href={`/modifyclient/${item.cliente_id}`}
                      onClick={() => {
                        localStorage.setItem("clienteCelularModify", item.cliente_celular)
                      }}
                    >
                      
                    </Button>
                    }
                    </tr>
                  ) 
                  : <div></div>
                }
              </tbody>
            </table>
            </div>
            <div id='sedes'>
              <div style={{display: 'flex', flexDirection: 'row'}}>
              <BusinessIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Sedes</h2>
              </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<CloudUploadIcon />} href='/createsede'>
                CREAR SEDE
              </Button>
              <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<PersonAddIcon />}
              onClick={() => Swal.fire({
                title: 'Inserte ID de sede a activar',
                input: 'number',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Activar',
                showLoaderOnConfirm: true,
                preConfirm: (id) => {
                  handleActivateSede(id)
                },
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('Sede activada', '', 'success')
                }
              })}>
                ACTIVAR SEDE MEDIANTE ID
              </Button>
            </div>
            <table>
              <thead>
                <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: 17}}>
                  <td style={{margin: '18px'}}>ID</td>
                  <td style={{margin: '18px'}}>Nombre</td>
                  <td style={{margin: '18px'}}>Dirección</td>
                  <td style={{margin: '18px'}}>Ciudad</td>
                  <td style={{margin: '18px'}}>Horario de Apertura</td>
                  <td style={{margin: '18px'}}>Horario de Cierre</td>
              </tr>
              </thead>
              <tbody>
                {
                  dataSedes.length > 0 ? dataSedes.filter((item) => item.sede_estado === 1).map((item) => 
                  <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 17}}>
                    {
                      <td style={{margin: '14px'}} key={item.sede_id}>{item.sede_id}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.sede_nombre}>{item.sede_nombre}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.sede_direccion}>{item.sede_direccion}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.sede_ciudad}>{item.sede_ciudad}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.sede_horario_apertura}>{item.sede_horario_apertura}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.sede_horario_cierre}>{item.sede_horario_cierre}</td>
                    }
                    {
                      <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      style={{margin: '7px 14px 7px 14px'}}
                      onClick={() => Swal.fire({
                        title: 'Deseas desactivar la Sede?',
                        showCancelButton: true,
                        confirmButtonText: `Desactivar`,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleUpdateSedes(item.sede_id)
                          Swal.fire('Sede desactivada', '', 'success')
                        }
                      })}
                    >
                    
                    </Button>
                    }
                    {
                      <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<SaveIcon />}
                      style={{margin: '7px 14px 7px 14px'}}
                      href={`/modifysede/${item.sede_id}`}
                    >
                      
                    </Button>
                    }
                    </tr>
                  ) 
                  : <div></div>
                }
              </tbody>
            </table>
            </div>
            <div id='categorias'>
              <div style={{display: 'flex', flexDirection: 'row'}}>
              <CategoryIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Categorias</h2>
              </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<CloudUploadIcon />} href='/createcategory'>
                CREAR CATEGORIA
              </Button>
              <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<PersonAddIcon />}
              onClick={() => Swal.fire({
                title: 'Inserte ID de categoria a activar',
                input: 'number',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Activar',
                showLoaderOnConfirm: true,
                preConfirm: (id) => {
                  handleActivateCategoria(id)
                },
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('Categoria activada', '', 'success')
                }
              })}>
                ACTIVAR CATEGORIA MEDIANTE ID
              </Button>
            </div>
            <table>
              <thead>
                <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: 17}}>
                  <td style={{margin: '18px'}}>ID</td>
                  <td style={{margin: '18px'}}>Nombre</td>
                  <td style={{margin: '18px'}}>Descripcion</td>
              </tr>
              </thead>
              <tbody>
                {
                  dataCategorias.length > 0 ? dataCategorias.filter((item) => item.categoria_estado === 1).map((item) => 
                  <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 17}}>
                    {
                      <td style={{margin: '14px'}} key={item.categoria_id}>{item.categoria_id}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.categoria_nombre}>{item.categoria_nombre}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.categoria_descripcion}>{item.categoria_descripcion}</td>
                    }
                    {
                      <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      style={{margin: '7px 14px 7px 14px'}}
                      onClick={() => Swal.fire({
                        title: 'Deseas desactivar la Categoria?',
                        showCancelButton: true,
                        confirmButtonText: `Desactivar`,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleUpdateCategorias(item.categoria_id)
                          Swal.fire('Categoria desactivada', '', 'success')
                        }
                      })}
                    >
                      
                    </Button>
                    }
                    {
                      <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<SaveIcon />}
                      style={{margin: '7px 14px 7px 14px'}}
                      href={`/modifycategory/${item.categoria_id}`}
                    >
                      
                    </Button>
                    }
                    </tr>
                  ) 
                  : <div></div>
                }
              </tbody>
            </table>
            </div>
            <div id='productos'>
              <div style={{display: 'flex', flexDirection: 'row'}}>
              <FastfoodIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Productos</h2>
              </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<CloudUploadIcon />} href='/createproduct'>
                CREAR PRODUCTO
              </Button>
              <Button style={{margin: '5px'}} variant="contained" color="secondary" startIcon={<PersonAddIcon />}
              onClick={() => Swal.fire({
                title: 'Inserte ID de producto a activar',
                input: 'number',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Activar',
                showLoaderOnConfirm: true,
                preConfirm: (id) => {
                  handleActivateProducto(id)
                },
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('Producto activado', '', 'success')
                }
              })}>
                ACTIVAR PRODUCTO MEDIANTE ID
              </Button>
            </div>
            <table>
              <thead>
                <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: 17}}>
                  <td style={{margin: '18px'}}>Imagen</td>
                  <td style={{margin: '18px'}}>ID</td>
                  <td style={{margin: '18px'}}>Nombre</td>
                  <td style={{margin: '18px'}}>Descripcion</td>
                  <td style={{margin: '18px'}}>Existencias</td>
                  <td style={{margin: '18px'}}>Precio</td>
                  <td style={{margin: '18px'}}>Descuento</td>
                  <td style={{margin: '18px'}}>IVA</td>
                  <td style={{margin: '18px'}}>ID Categoria</td>
                </tr>
              </thead>
              <tbody>
                {
                  dataProductos.length > 0 ? dataProductos.filter((item) => item.producto_estado === 1).map((item) => 
                  <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', fontSize: 17}}>
                    {
                      <td style={{margin: '14px'}} key={item.producto_imagen}><img src={item.producto_imagen} alt={item.producto_imagen} width="40" height="40"></img></td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.producto_codigo}>{item.producto_codigo}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.producto_nombre}>{item.producto_nombre}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.producto_descripcion}>{item.producto_descripcion}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.producto_existencias}>{item.producto_existencias}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.producto_precio}>{item.producto_precio}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.producto_descuento}>{item.producto_descuento !== 0 ? `${item.producto_descuento}%` : "No aplica"}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.producto_iva}>{item.producto_iva}%</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.categoria_id}>{item.categoria_id}</td>
                    }
                    {
                      <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      style={{margin: '7px 14px 7px 14px'}}
                      onClick={() => Swal.fire({
                        title: 'Deseas desactivar el Producto?',
                        showCancelButton: true,
                        confirmButtonText: `Desactivar`,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleUpdateProductos(item.producto_codigo)
                          Swal.fire('Producto desactivado', '', 'success')
                        }
                      })}
                    >
                      
                    </Button>
                    }
                    {
                      <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<SaveIcon />}
                      style={{margin: '7px 14px 7px 14px'}}
                      href={`/modifyproduct/${item.producto_codigo}`}
                    >
                      
                    </Button>
                    }
                    </tr>
                  ) 
                  : <div></div>
                }
              </tbody>
            </table>
            </div>
            <div id="reportes" style={{display: 'flex', flexDirection: 'column'}}>
            <div id="masvendidos">
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AssignmentIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Reporte 1: Productos más vendidos (Top 20)</h2>
              </div>
              <Bar data={dataChartReporte1} options={options} />
            </div>
            <div id="clientesdinero">
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AssignmentIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Reporte 2: Clientes que más dinero ingresaron a la tienda</h2>
              </div>
              <Pie data={dataChartReporte2} options={options} />
            </div>
            <div id="ventasfecha">
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AssignmentIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Reporte 3: Ventas por fecha (fecha inicial - fecha final)</h2>
              </div>
              <Typography component="h6" variant="h6">Seleccione rango de fechas</Typography>
              <Grid container justify="space-around">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="fechainicial"
          label="Fecha Inicial"
          format="dd/MM/yyyy"
          value={selectedDate1}
          onChange={handleDateChange1}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="fechafinal"
          label="Fecha Final"
          format="dd/MM/yyyy"
          value={selectedDate2}
          onChange={handleDateChange2}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
            </Grid>
            <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleReporteVenta}
          >
            Consultar
          </Button>
          {
            dataReporte3.length > 0 ? 
            <div>
              <Bar data={{
              labels: ['Rango de fecha'],
    datasets: [
      {
        label: 'Valor promedio',
        data: dataReporte3.map(a => a.valor_promedio),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      },
      {
        label: 'Pedido mas alto',
        data: dataReporte3.map(a => a.pedido_mas_alto),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      },
      {
        label: 'Pedido mas bajo',
        data: dataReporte3.map(a => a.pedido_mas_bajo),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      },
      {
        label: 'Total ventas',
        data: dataReporte3.map(a => a.total_ventas),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      },
    ],
            }}
            options={options} />
            <Typography component="h6" variant="h6">Cantidad de pedidos realizados en la fecha: {dataReporte3[0].cantidad_pedidos}</Typography>
            </div>
            
          : <div></div>}
            </div>
            <div id="menosvendidos">
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AssignmentIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Reporte 4: Productos menos vendidos (20 productos)</h2>
              </div>
              <Bar data={dataChartReporte4} options={options} />
            </div>
            <div id="ventasproducto">
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AssignmentIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Reporte 5: Total de ventas de un producto particular en los últimos 6 meses</h2>
              </div>
              <Typography component="h6" variant="h6">Digite ID producto a consultar</Typography>
              <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="idproducto"
                label="ID Producto"
                name="idproducto"
                autoComplete="idproducto"
                value={valueIDProducto}
                onChange={(event) => {setValueIDProducto(event.target.value)}}
              />
            </Grid>
            <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleReporteMesesProducto}
          >
            Consultar
          </Button>
          {
            dataReporte5.length > 0 ? 
            <div>
              <Bar data={{
              labels: dataReporte5.map(item => item.fecha).map(item => changeDate(item)).sort((a, b) => parseInt(a) - parseInt(b)).map(item => mapNumberToMonth(item)),
    datasets: [
      {
        label: '# de Ventas de Producto / Mes',
        data: dataReporte5.map(item => ({
          fecha: changeDate(item.fecha),
          total_ventas: item.total_ventas
        })).sort((a, b) => parseInt(a.fecha) - parseInt(b.fecha)).map(item => item.total_ventas),
        backgroundColor: backgroundArrayColors,
        borderColor: borderArrayColors,
        borderWidth: 1,
      }
    ],
            }}
            options={options} />
            </div>
            
          : <div></div>}
            </div>
            <div id="sedemas">
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AssignmentIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Reporte 6: Sedes del restaurante con mayores ventas</h2>
              </div>
              <Pie data={dataChartReporte6} options={options} />
            </div>
            <div id="sedemenos">
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AssignmentIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Reporte 7: Sedes del restaurante con menores ventas</h2>
              </div>
              <Pie data={dataChartReporte7} options={options} />
            </div>
            <div id="clientesfc">
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <AssignmentIcon style={{marginTop: '20px', marginRight: '5px'}}/><h2>Reporte 8: Clientes que cumplirán años el mes que empieza</h2>
              </div>
              <table>
              <thead>
                <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: 17}}>
                  <td style={{marginLeft: '60px', marginRight: '60px'}}>Nombre</td>
                  <td style={{marginLeft: '60px', marginRight: '60px'}}>Apellido</td>
                  <td style={{marginLeft: '60px', marginRight: '60px'}}>Fecha de nacimiento</td>
                  <td style={{marginLeft: '60px', marginRight: '60px'}}>Documento</td>
              </tr>
              </thead>
              <tbody>
                {
                  dataReporte8.length > 0 ? dataReporte8.map((item) => 
                  <tr style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 17}}>
                    {
                      <td style={{margin: '14px'}} key={item.nombre}>{item.nombre}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.apellido}>{item.apellido}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.fecha_nacimiento}>{item.fecha_nacimiento}</td>
                    }
                    {
                      <td style={{margin: '14px'}} key={item.documento}>{item.documento}</td>
                    }
                    </tr>
                  ) 
                  : <div></div>
                }
              </tbody>
            </table>
            </div>
            </div>
            </Grid>
          </Container>
        </main>
      </div> : <NotFound />

      }
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataTrabajadores: state.dataTrabajadores,
    dataClientes: state.dataClientes,
    dataCategorias: state.dataCategorias,
    dataSedes: state.dataSedes,
    dataProductos: state.dataProductos,
  }
}

const mapDispatchToProps = {
  getTrabajadores,
  deleteTrabajadores,
  activateTrabajador,
  getClientes,
  deleteClientes,
  activateCliente,
  getCategorias,
  deleteCategorias,
  activateCategoria,
  getSedes,
  deleteSedes,
  activateSede,
  getProductos,
  deleteProductos,
  activateProducto,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(DashboardAdmin));