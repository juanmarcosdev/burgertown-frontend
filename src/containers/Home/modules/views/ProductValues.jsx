import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import salud from '../../../../assets/static/salud.svg';
import comida1 from '../../../../assets/static/comida1.svg';
import comida2 from '../../../../assets/static/paquete_de_comida.svg';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={salud}
                alt="salud"
              />
              <Typography variant="h6" className={classes.title}>
                Protocolos de Bioseguridad
              </Typography>
              <Typography variant="h5">
                {'Preparamos y empacamos todos nuestros alimentos con los más altos estándares '}
                {'de Protocolos de Bioseguridad y manejo adecuado de alimentos, para brindarte '}
                {'una experiencia agradable y segura para ti y tu familia.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={comida1}
                alt="comida1"
              />
              <Typography variant="h6" className={classes.title}>
                Caliente hasta tu casa
              </Typography>
              <Typography variant="h5">
                {'En BurgerTown nos preocupamos porque la experiencia sea la más agradable'}
                {', y por ello en nuestros empaques de alimentos usamos material termoaislante '}
                {'para conservar el calor del plato mientras llega a tu domicilio.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={comida2}
                alt="comida2"
              />
              <Typography variant="h6" className={classes.title}>
                Amigables con el medio ambiente
              </Typography>
              <Typography variant="h5">
                {'Todos nuestros empaques de comida son eco-friendly, hechos con material reciclado '}
                {'y listos para ser reciclados y reusados una vez hayas terminado de comer. Al ser desechados, tardan solo 2 años en '}
                {'biodegradarse.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
