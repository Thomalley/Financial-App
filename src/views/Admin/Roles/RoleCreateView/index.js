import React, { useEffect, useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from '../../../../components/Layout/Page';
import Header from './Header';
import RoleCreateForm from './RoleCreateForm';
import RequestGroup from '../../../../requests/api/group';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function RoleCreateView() {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const response = await RequestGroup.getGroupsPerPage(0, 1000, '');
      if (response.success) {
        const data = await response.data.data.groups;
        setGroups(data);
      }
    };

    getGroups();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Example Template | Agregar Admin"
    >
      <Container maxWidth={false}>
        <Header />
        <RoleCreateForm groups={groups} />
      </Container>
    </Page>
  );
}

export default RoleCreateView;
