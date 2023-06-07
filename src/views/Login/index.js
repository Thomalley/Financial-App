/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import {
  // Avatar,
  Box,
  Button,
  Container,
  Card,
  CardContent,
  Divider,
  Slide,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
// import LockIcon from '@material-ui/icons/Lock';
import { useSelector } from 'react-redux';
import Page from '../../components/Layout/Page';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthService from '../../services/authService';
import useStyles from './styles';

function LoginView() {
  const classes = useStyles();
  // const history = useHistory();
  const account = useSelector((state) => state.account);
  const [seeRegisterForm, setSeeRegisterForm] = useState(false);

  if (AuthService.isAuthenticated()) {
    return <Redirect to="/postRegister" />;
  }
  console.log(account, 'reduc');
  const handleShowRegisterForm = () => {
    setSeeRegisterForm(!seeRegisterForm);
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container>
        <Card className={classes.card}>
          <CardContent className={classes.contentLogin}>
            <Typography
              variant="h2"
              color="textSecondary"
            >
              Ingresá
            </Typography>
            <Box mt={3}>
              <LoginForm />
            </Box>
          </CardContent>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              maxWidth: '1%',
            }}
          />
          <CardContent
          >
            <Typography
              variant="h2"
              color="textSecondary">
              ¡Registrate!
            </Typography>
            <Box mt={3}>
              <RegisterForm />
            </Box>
          </CardContent>
          <Box
            className={classes.magicBox}
            style={{ left: seeRegisterForm ? 353 : 965 }}
          >
            <CardContent
              className={classes.magicBoxContent}
            >
              <Box
                display='flex'
                flexDirection='column'
                flexWrap='wrap'
                justifyContent='center'
              >
                <Box>
                  <Typography
                    variant='h2'
                    color="textSecondary"
                  >
                    Bienvenidx al login
                  </Typography>
                </Box>
                <Box
                  mt='3%'
                  width='max-content'
                  display='flex'
                  alignSelf='center'
                >
                  <Typography
                    variant="h5"
                    color="textSecondary"
                  >
                    {`${seeRegisterForm ? '¿Tenés cuenta?' : '¿No tenés una cuenta?'}`}
                  </Typography>
                </Box>
              </Box>
              <Box mt={'5%'}>
                <Button
                  className={classes.magicBoxBtn}
                  variant="outlined"
                  fullWidth
                  onClick={handleShowRegisterForm}
                >
                  <Typography
                    variant="h5"
                    color="textSecondary"
                  >
                    {`${seeRegisterForm ? 'Iniciar sesión' : '¡Registrate!'}`}
                  </Typography>
                </Button>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

export default LoginView;
