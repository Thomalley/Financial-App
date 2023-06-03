/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  Edit as EditIcon,
  Search as SearchIcon,
} from 'react-feather';
import { useSnackbar } from 'notistack';
import Request from '../../../requests/api/user';
import getInitials from '../../../utils/getInitials';

const sortOptions = [
  {
    value: 'updated_at|desc',
    label: 'Más nuevo primero',
  },
  {
    value: 'updated_at|asc',
    label: 'Más antiguo primero',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500,
  },
  bulkOperations: {
    position: 'relative',
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  bulkAction: {
    marginLeft: theme.spacing(2),
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
}));

function Results({
  className,
  users,
  pageOfTable,
  setPageOfTable,
  limit,
  setLimit,
  searchValue,
  setSearchValue,
  totalUsers,
  ...rest
}) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [currentUsers, setCurrentUsers] = useState(users);

  useEffect(() => { setCurrentUsers(users); }, [users]);

  const handleQueryChange = (event) => {
    event.persist();
    setSearchValue(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllUsers = (event) => {
    setSelectedUsers(event.target.checked
      ? currentUsers.map((user) => user.id)
      : []);
  };

  const handleSelectOneUser = (event, userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== userId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPageOfTable(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  // Usually query is done on backend with indexing solutions
  const enableBulkOperations = selectedUsers.length > 0;
  const selectedSomeUsers = selectedUsers.length > 0 && selectedUsers.length < currentUsers.length;
  const selectedAllUsers = selectedUsers.length === currentUsers.length;
  const account = useSelector((state) => state.account);

  const deleteUsers = async () => {
    if (selectedUsers.includes(account.user.id)) {
      enqueueSnackbar('No puede eliminar su propia cuenta', {
        variant: 'error',
      });
    } else {
      for (let a = 0; a < selectedUsers.length; a += 1) {
        Request.deleteUser(selectedUsers[a]);
        enqueueSnackbar('Cuentas eliminadas!', {
          variant: 'success',
        });
      }
      setCurrentUsers(currentUsers.filter((e) => (!selectedUsers.includes(e.id))));
      setSelectedUsers([]);
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Divider />
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          onChange={handleQueryChange}
          placeholder="Buscar usuario"
          value={searchValue}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <TextField
          label="Orden"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllUsers}
              indeterminate={selectedSomeUsers}
              onChange={handleSelectAllUsers}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={() => deleteUsers()}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllUsers}
                    indeterminate={selectedSomeUsers}
                    onChange={handleSelectAllUsers}
                  />
                </TableCell>
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  Rol
                </TableCell>
                <TableCell align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((user) => {
                const isUserSelected = selectedUsers.includes(user.id);
                return (
                  <TableRow
                    hover
                    key={user.id}
                    selected={isUserSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isUserSelected}
                        onChange={(event) => handleSelectOneUser(event, user.id)}
                        value={isUserSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar
                          className={classes.avatar}
                          src={user.avatar}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                        <div>
                          <Typography
                            color="inherit"
                            variant="h6"
                          >
                            {user.name} {' '} {user.lastname}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            {user.email}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {user.role?.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/administracion/usuarios/${user.id}/editar`}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalUsers}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={pageOfTable}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Filas por página"
      />
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
  pageOfTable: PropTypes.number,
  setPageOfTable: PropTypes.func,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  totalUsers: PropTypes.number,
};

Results.defaultProps = {
  users: [],
};

export default Results;
