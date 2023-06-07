import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  Grid,
  SvgIcon,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  PlusCircle as PlusCircleIcon,
} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
  actionIcon: {
    marginRight: theme.spacing(1),
  },
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
          Usuarios
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          className={classes.action}
          href="/administracion/usuarios/crear"
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <PlusCircleIcon />
          </SvgIcon>
          Agregar Usuario
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
