import React, {
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Page from '../../../../components/Layout/Page';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import Request from '../../../../requests/api/role';
import RoleEditForm from './RoleEditForm';
import Header from './Header';
import RequestGroup from '../../../../requests/api/group';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function RoleEditView(props) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [role, setRole] = useState();
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

  useEffect(() => {
    const getRole = async () => {
      const response = await Request.getRoleById(props.match.params.id);
      if (isMountedRef.current) {
        setRole(response.data.data.role);
      }
    };

    getRole();
    // eslint-disable-next-line
  }, [props]);

  if (!role) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Template Title | Editar Grupo"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
        <RoleEditForm role={role} groups={groups} />
        </Box>
      </Container>
    </Page>
  );
}

RoleEditView.propTypes = {
  match: PropTypes.any,
};

export default withRouter(RoleEditView);
