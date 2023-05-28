import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Page from '../../../../components/Layout/Page';
import Header from './Header';
import AdminCreateForm from './UserCreateForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function CustomerCreateView() {
  const classes = useStyles();
  const account = useSelector((state) => state.account);

  return (
    <Page
      className={classes.root}
      title="Example Template | Agregar Admin"
    >
      <Container maxWidth={false}>
        <Header />
        <AdminCreateForm roleName={account.user.role.name} />
      </Container>
    </Page>
  );
}

export default CustomerCreateView;
