import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://cdn.pixabay.com/photo/2017/04/23/09/03/hamburger-2253349_960_720.jpg',
      title: 'Hamburguesas',
      width: '40%',
    },
    {
      url:
        'https://st4.depositphotos.com/1692343/20098/i/450/depositphotos_200980630-stock-photo-homemade-peruvian-salchipapa-fries-mayo.jpg',
      title: 'Salchipapas',
      width: '25%',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2016/11/21/15/52/appetizer-1846083_960_720.jpg',
      title: 'Papas a la francesa',
      width: '35%',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2020/06/24/22/45/hot-dog-5337929_960_720.jpg',
      title: 'Perros calientes',
      width: '38%',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2016/03/05/20/02/appetizer-1238615_960_720.jpg',
      title: 'Sándwich',
      width: '38%',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_960_720.jpg',
      title: 'Burritos',
      width: '24%',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2020/09/13/15/41/steak-5568608_960_720.jpg',
      title: 'A la parrilla',
      width: '40%',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_960_720.jpg',
      title: 'Postres',
      width: '20%',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2016/08/23/08/53/tacos-1613795_960_720.jpg',
      title: 'Tacos',
      width: '40%',
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Conoce nuestro amplio Menú con la más exquisita comida
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
