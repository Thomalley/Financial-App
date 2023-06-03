import React from 'react';
import { Redirect, useHistory } from 'react-router';
import {
  Avatar,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { useSelector } from 'react-redux';
import Page from '../../components/Layout/Page';
import Logo from '../../components/Layout/Logo';
import LoginForm from './LoginForm';
import AuthService from '../../services/authService';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80,
  },
  backButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%',
    },
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4),
  },
  icon: {
    backgroundColor: '#22335E',
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  logo: {
    maxWidth: '300px',
    maxHeight: '100px',
    // filter: theme.logo.filterLoad
  },
  pointer: {
    cursor: 'pointer',
  },
}));

function LoginView() {
  const classes = useStyles();
  const history = useHistory();
  const account = useSelector((state) => state.account);

  if (AuthService.isAuthenticated()) {
    console.log('AUTENTICADO');
    return <Redirect to="/postRegister" />;
  }

  const handleSubmitSuccess = () => {
    console.log(account, 'account reducer');
    // if (account.user.role.name === 'developer') {
    //   history.push('/administracion/developers/grafico');
    // } else {
    //   history.push('/administracion/panel-de-control');
    // }
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container maxWidth="md">
        <Box
          mb={8}
          display="flex"
          alignItems="center"
          justifyContent='center'
        >
          <Logo className={classes.logo} />
        </Box>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h2"
              color="textPrimary"
            >
              Ingresa
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Ingresa a la plataforma de backoffice
            </Typography>
            <Box mt={3}>
              <LoginForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Typography className={classes.pointer} align='center' onClick={() => history.push('/recuperar-contrasena')}>
              Recuperar contraseña
            </Typography>
          </CardContent>

        </Card>

      </Container>
    </Page>
  );
}

export default LoginView;
