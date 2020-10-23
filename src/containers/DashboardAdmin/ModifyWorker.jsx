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
import { withRouter } from 'react-router-dom';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newWorker = {
      trabajador_documento: (document !== '' ? document : undefined),
      trabajador_nombre: (name !== '' ? name : undefined),
      trabajador_apellido: (surname !== '' ? surname : undefined),
      trabajador_celular: (phone !== '' ? phone : undefined),
      trabajador_cargo: (position !== '' ? position : undefined),
      trabajador_direccion: (address !== '' ? address : undefined),
      trabajador_password: (password !== '' ? password : undefined),
      trabajador_foto: (photo !== '' ? photo : undefined),
    }
    console.log(JSON.stringify(newWorker))
    const targetUrl = `https://burgertown-backend.herokuapp.com/Trabajador/Edit/${workerId}`
    const response = await fetch(targetUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorker)
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modificar Trabajador con ID {workerId}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
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

export default withRouter(ModifyWorker)