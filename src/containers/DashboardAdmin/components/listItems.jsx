import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import WorkIcon from '@material-ui/icons/Work';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import CategoryIcon from '@material-ui/icons/Category';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="#trabajadores">
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Trabajadores" />
    </ListItem>
    <ListItem button component="a" href="#clientes">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItem>
    <ListItem button component="a" href="#sedes">
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Sedes" />
    </ListItem>
    <ListItem button component="a" href="#categorias">
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categorias" />
    </ListItem>
    <ListItem button component="a" href="#productos">
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Productos" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Reportes</ListSubheader>
    <ListItem button component="a" href="#masvendidos">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte 1: + Vendidos" />
    </ListItem>
    <ListItem button component="a" href="#clientesdinero">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte 2: Clientes + $" />
    </ListItem>
    <ListItem button component="a" href="#ventasfecha">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte 3: Ventas" />
    </ListItem>
    <ListItem button component="a" href="#menosvendidos">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte 4: - Vendidos" />
    </ListItem>
    <ListItem button component="a" href="#ventasproducto">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte 5: $ Producto" />
    </ListItem>
    <ListItem button component="a" href="#sedemas">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte 6: Sede +" />
    </ListItem>
    <ListItem button component="a" href="#sedemenos">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte 7: Sede -" />
    </ListItem>
    <ListItem button component="a" href="#clientesfc">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte 8: Clientes FC" />
    </ListItem>
  </div>
);