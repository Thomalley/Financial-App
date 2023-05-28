import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Typography,
  Grid,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
}));

function Header({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justifyContent="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          Crear Usuario
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to="/administracion/usuarios"
        >
          Cancelar
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
