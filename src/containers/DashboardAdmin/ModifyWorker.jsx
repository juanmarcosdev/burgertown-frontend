import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import WorkIcon from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

const ModifyWorker = ({ match }) => {
  const classes = useStyles();
  const workerId = match.params.workerId

  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [document, setDocument] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [photo, setPhoto] = React.useState('');

  React.useEffect(() => {
    fetch(`https://burgertown-backend.herokuapp.com/Trabajador/${workerId}`, 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        console.log(data.data)
        setName(data.data.trabajador_nombre);
        setSurname(data.data.trabajador_apellido);
        setPhone(data.data.trabajador_celular);
        setDocument(data.data.trabajador_documento);
        setAddress(data.data.trabajador_direccion);
        setPosition(data.data.trabajador_cargo);
        setPhoto(data.data.trabajador_foto);
      })
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newWorker = {
      trabajador_documento: document,
      trabajador_nombre: name,
      trabajador_apellido: surname,
      trabajador_celular: phone,
      trabajador_cargo: position,
      trabajador_direccion: address,
      trabajador_password: (password !== '' ? password : undefined),
      trabajador_foto: photo,
    }
    console.log(JSON.stringify(newWorker))
    const targetUrl = `https://burgertown-backend.herokuapp.com/Trabajador/Edit/${workerId}`
    const response = await fetch(targetUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: localStorage.token},
      body: JSON.stringify(newWorker)
    })
    if(response.status === 200) {
      Swal.fire(
        'Trabajador modificado',
        'Trabajador modificado exitosamente!',
        'success'
      )
    } else {
      Swal.fire(
        'Error al modificar trabajador',
        'Hubo un error modificando el trabajador',
        'error'
      )
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <WorkIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modificar Trabajador con ID {workerId}
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
                value={position}
                variant="outlined"
                required
                fullWidth
                id="cargo"
                label="Cargo"
                name="cargo"
                autoComplete="cargo"
                onChange={(event) => {setPosition(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={photo}
                variant="outlined"
                required
                fullWidth
                id="foto"
                label="URL Foto"
                name="foto"
                autoComplete="foto"
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Modificar Trabajador
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

export default withRoot(withRouter(ModifyWorker));