import React from 'react';
import { matchPath, useHistory } from 'react-router';
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
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Page from '../../components/Layout/Page';
import Logo from '../../components/Layout/Logo';
import SetPasswordForm from './SetPasswordForm';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80,
  },
  backButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    backgroundColor: theme.palette.background.transition,
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

function PasswordRecoveryView() {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = () => {
    history.push('/login');
  };

  const match = matchPath(window.location.pathname, {
    path: '/reset-password/:token',
    exact: true,
    strict: false,
  });

  const { token } = match.params;
  return (
    <Page
      className={classes.root}
      title="Password recovery"
    >
      <Container maxWidth="md">
        <Box
          mb={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Logo className={classes.logo} />
        </Box>
        <Card className={classes.card} >
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <AccountBoxIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h2"
              color='primary'
            >
              Recuperación de contraseña
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Ingresa tu nueva contraseña
            </Typography>
            <Box mt={3}>
              <SetPasswordForm onSubmitSuccess={handleSubmitSuccess} token={token} />
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

export default PasswordRecoveryView;
