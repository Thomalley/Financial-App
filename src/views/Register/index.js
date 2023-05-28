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
import Page from '../../components/Layout/Page';
import Logo from '../../components/Layout/Logo';
import RegisterForm from './RegisterForm';
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
}));

function RegisterView() {
  const classes = useStyles();
  const history = useHistory();

  if (AuthService.isAuthenticated()) {
    return <Redirect to="/administracion/usuarios" />;
  }

  const handleSubmitSuccess = () => {
    history.push('/postRegister');
  };

  return (
    <Page
      className={classes.root}
      title="Registro"
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
              Registrate
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Registrate en la plataforma
            </Typography>
            <Box mt={3}>
              <RegisterForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterView;
