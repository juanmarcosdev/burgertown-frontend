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

export default function CreateProduct() {
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [exist, setExist] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [discount, setDiscount] = React.useState('');
  const [iva, setIva] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProduct = {
      producto_nombre: name,
      producto_descripcion: description,
      producto_imagen: image,
      producto_existencias: parseInt(exist),
      producto_precio: parseInt(price),
      producto_descuento: parseInt(discount),
      producto_iva: parseInt(iva),
      categoria_id: parseInt(category),
    }
    console.log(newProduct);
    const response = await fetch(`https://burgertown-backend.herokuapp.com/Producto/Create`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(newProduct)
    })
    console.log(response.status)
    console.log(response.statusText)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear Producto
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
                autoComplete="descripcion"
                name="descripcion"
                variant="outlined"
                required
                fullWidth
                id="descripcion"
                label="Descripcion"
                onChange={(event) => {setDescription(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="image"
                name="image"
                variant="outlined"
                required
                fullWidth
                id="imagen"
                label="URL Imagen"
                onChange={(event) => {setImage(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="exist"
                name="exist"
                variant="outlined"
                required
                fullWidth
                id="exist"
                label="Existencias"
                onChange={(event) => {setExist(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="price"
                name="price"
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Precio"
                onChange={(event) => {setPrice(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="discount"
                name="discount"
                variant="outlined"
                required
                fullWidth
                id="discount"
                label="Porcentaje de Descuento"
                onChange={(event) => {setDiscount(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="iva"
                name="iva"
                variant="outlined"
                required
                fullWidth
                id="iva"
                label="IVA"
                onChange={(event) => {setIva(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="category"
                name="category"
                variant="outlined"
                required
                fullWidth
                id="category"
                label="ID Categoria"
                onChange={(event) => {setCategory(event.target.value)}}
                autoFocus
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
            Crear Producto
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