import React, {
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import Page from '../../../../components/Layout/Page';
import Header from './Header';
import Results from './Results';
import Request from '../../../../requests/api/role';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function RoleListView() {
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const [pageOfTable, setPageOfTable] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [totalRoles, setTotalRoles] = useState(0);

  useEffect(() => {
    const getRoles = async () => {
      const response = await Request.getRolesPerPage(pageOfTable, limit, searchValue);
      if (response.success) {
        const data = await response.data.data.roles;
        setRoles(data);
        setTotalRoles(response.data.data.totalRoles);
      }
    };
    getRoles();
  }, [pageOfTable, limit, searchValue]);

  return (
    <Page
      className={classes.root}
      title="TubeOps | Roles"
    >
      <Container maxWidth={false}>
        <Header />
        {roles && (
          <Box mt={3}>
            <Results
              roles={roles}
              pageOfTable={pageOfTable}
              setPageOfTable={setPageOfTable}
              limit={limit}
              setLimit={setLimit}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              totalRoles={totalRoles}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default RoleListView;
