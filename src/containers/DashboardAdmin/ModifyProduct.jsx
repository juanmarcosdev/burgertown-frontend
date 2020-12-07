import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FastfoodIcon from '@material-ui/icons/Fastfood';
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

const ModifyProduct = ({ match }) => {
  const classes = useStyles();
  const productId = match.params.productId;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [exist, setExist] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [discount, setDiscount] = React.useState('');
  const [iva, setIva] = React.useState('');

  React.useEffect(() => {
    fetch(`https://burgertown-backend.herokuapp.com/Producto/${productId}`, 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json",
                 token: localStorage.token
               },
    }).then(res => res.json())
      .then(data => {
        console.log(data.data)
        setName(data.data.producto_nombre)
        setDescription(data.data.producto_descripcion)
        setImage(data.data.producto_imagen)
        setExist(data.data.producto_existencias)
        setPrice(data.data.producto_precio)
        setDiscount(data.data.producto_descuento)
        setIva(data.data.producto_iva)
      })
  }, []);

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
    }
    console.log(JSON.stringify(newProduct));
    const response = await fetch(`https://burgertown-backend.herokuapp.com/Producto/Edit/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: localStorage.token},
      body: JSON.stringify(newProduct)
    })
    if(response.status === 200) {
      Swal.fire(
        'Producto modificado',
        'Producto modificado exitosamente!',
        'success'
      )
    } else {
      Swal.fire(
        'Error al modificar producto',
        'Hubo un error modificando el producto',
        'error'
      )
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modificar Producto con ID {productId}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                value={description}
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
                value={image}
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
                value={exist}
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
                value={price}
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
                value={discount}
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
                value={iva}
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Modificar Producto
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

export default withRoot(withRouter(ModifyProduct));