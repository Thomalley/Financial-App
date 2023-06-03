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
import Page from '../../../components/Layout/Page';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Request from '../../../requests/api/user';
import AdminEditForm from './UserEditForm';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function AdminEditView(props) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    const getAdmin = async () => {
      const res = await Request.getUserById(props.match.params.id);
      const response = res.data;
      if (isMountedRef.current) {
        setAdmin(response.data.user);
      }
    };

    getAdmin();
    // eslint-disable-next-line
  }, [props]);

  if (!admin) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Template Title | Editar Admin"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <AdminEditForm admin={admin} />
        </Box>
      </Container>
    </Page>
  );
}

AdminEditView.propTypes = {
  match: PropTypes.any,
};

export default withRouter(AdminEditView);
