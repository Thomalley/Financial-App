/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
import Request from '../../../../requests/api/role';
import { SUPER_ADMIN, SYSTEM_ADMIN } from '../../../../utils/const/user_types';

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
  roles,
  pageOfTable,
  setPageOfTable,
  limit,
  setLimit,
  searchValue,
  setSearchValue,
  totalRoles,
  ...rest
}) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [currentRoles, setCurrentRoles] = useState(roles);

  useEffect(() => { setCurrentRoles(roles); }, [roles]);

  const handleQueryChange = (event) => {
    event.persist();
    setSearchValue(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllRoles = (event) => {
    setSelectedRoles(event.target.checked
      ? currentRoles.map((role) => role.id)
      : []);
  };

  const handleSelectOneRole = (event, roleId) => {
    if (!selectedRoles.includes(roleId)) {
      setSelectedRoles((prevSelected) => [...prevSelected, roleId]);
    } else {
      setSelectedRoles((prevSelected) => prevSelected.filter((id) => id !== roleId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPageOfTable(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  // Usually query is done on backend with indexing solutions
  const enableBulkOperations = selectedRoles.length > 0;
  const selectedSomeRoles = selectedRoles.length > 0 && selectedRoles.length < currentRoles.length;
  const selectedAllRoles = selectedRoles.length === currentRoles.length;
  const account = useSelector((state) => state.account);

  const deleteRoles = async () => {
    if (account.user.role.name !== SUPER_ADMIN && account.user.role.name !== SYSTEM_ADMIN && account.user.role.name !== SYSTEM_ADMIN) {
      enqueueSnackbar('Debe ser Administrador!', {
        variant: 'error',
      });
    } else if (selectedRoles.includes(account.user.id)) {
      enqueueSnackbar('No puede eliminar su propia cuenta', {
        variant: 'error',
      });
    } else {
      for (let a = 0; a < selectedRoles.length; a += 1) {
        Request.deleteRole(selectedRoles[a]);
        enqueueSnackbar('Cuentas eliminadas!', {
          variant: 'success',
        });
      }
      setCurrentRoles(currentRoles.filter((e) => (!selectedRoles.includes(e.id))));
      setSelectedRoles([]);
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
              checked={selectedAllRoles}
              indeterminate={selectedSomeRoles}
              onChange={handleSelectAllRoles}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={() => deleteRoles()}
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
                    checked={selectedAllRoles}
                    indeterminate={selectedSomeRoles}
                    onChange={handleSelectAllRoles}
                  />
                </TableCell>
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  Grupos
                </TableCell>
                <TableCell align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRoles.map((role) => {
                const isRoleSelected = selectedRoles.includes(role.id);

                return (
                  <TableRow
                    hover
                    key={role.id}
                    selected={isRoleSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isRoleSelected}
                        onChange={(event) => handleSelectOneRole(event, role.id)}
                        value={isRoleSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                          <Typography
                            color="inherit"
                            variant="h6"
                          >
                            {role.name}
                          </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                    {role.groups.map((g) => g.name).join(', ')}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/administracion/roles/${role.id}/editar`}
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
        count={totalRoles}
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
  roles: PropTypes.array,
  pageOfTable: PropTypes.number,
  setPageOfTable: PropTypes.func,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  totalRoles: PropTypes.number,
};

Results.defaultProps = {
  roles: [],
};

export default Results;
