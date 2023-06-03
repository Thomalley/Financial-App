import React, {
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import Page from '../../../components/Layout/Page';
import Header from './Header';
import Results from './Results';
import Request from '../../../requests/api/user';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function AdminListView() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [pageOfTable, setPageOfTable] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      const response = await Request.getUsersPerPage(pageOfTable, limit, searchValue);
      if (response.success) {
        const data = await response.data.data.users;
        setUsers(data);
        setTotalUsers(response.data.data.totalUsers);
      }
    };
    getUsers();
  }, [pageOfTable, limit, searchValue]);

  return (
    <Page
      className={classes.root}
      title="TubeOps | Users"
    >
      <Container maxWidth={false}>
        <Header />
        {users && (
          <Box mt={3}>
            <Results
              users={users}
              pageOfTable={pageOfTable}
              setPageOfTable={setPageOfTable}
              limit={limit}
              setLimit={setLimit}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              totalUsers={totalUsers}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default AdminListView;
