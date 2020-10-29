import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import logo from '../../../../assets/static/burgertown_logo.png';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const styles = (theme) => ({
  title: {
    fontSize: 20,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 13,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

const AppAppBar = (props) => {
  const { classes, history } = props
  console.log(props)


  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <img src={logo} alt='logo' width='60' height='60'/>
          </div>
          <Link
            variant='h6'
            underline='none'
            color='inherit'
            className={classes.title}
            href='/'
          >
            BurgerTown
          </Link>
          {
            localStorage.token === undefined ? <div className={classes.right}>
            <Link
              color='inherit'
              variant='h6'
              underline='none'
              className={classes.rightLink}
              href='/loginchooser'
            >
              Iniciar Sesión
            </Link>
            <Link
              variant='h6'
              underline='none'
              className={clsx(classes.rightLink, classes.linkSecondary)}
              href='/registrocliente'
            >
              Registrarse
            </Link>
          </div> : <div className={classes.right}>
            <Link
              component='button'
              color='inherit'
              variant='h6'
              underline='none'
              className={classes.rightLink}
              onClick={() => {
                Swal.fire({
                  title: 'Deseas cerrar sesión?',
                  showDenyButton: true,
                  showCancelButton: true,
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
              }}
            >
              Cerrar Sesión
            </Link>
          </div>
          }
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AppAppBar));
