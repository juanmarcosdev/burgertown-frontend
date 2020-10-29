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
import Swal from 'sweetalert2';

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

const ModifyCategory = ({ match }) => {
  const classes = useStyles();
  const categoryId = match.params.categoryId

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCategory = {
      categoria_nombre: (name !== '' ? name : undefined),
      categoria_descripcion: (description !== '' ? description : undefined),
    }
    const response = await fetch(`https://burgertown-backend.herokuapp.com/Categoria/Edit/${categoryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: localStorage.token},
      body: JSON.stringify(newCategory)
    })
    if(response.status === 200) {
      Swal.fire(
        'Categoría modificada',
        'Categoría modificada exitosamente!',
        'success'
      )
    } else {
      Swal.fire(
        'Error al modificar categoría',
        'Hubo un error modificando la categoría',
        'error'
      )
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modificar Categoria con ID {categoryId}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="descripcion"
                label="Descripcion"
                name="descripcion"
                autoComplete="descripcion"
                onChange={(event) => {setDescription(event.target.value)}}
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
            Modificar Categoria
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

export default withRouter(ModifyCategory)