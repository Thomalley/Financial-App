import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import { Redirect } from 'react-router-dom';
import Request from '../../../../requests/api/role';

const useStyles = makeStyles(() => ({
  root: {},
}));

function RoleEditForm({
  className,
  role,
  groups,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [removed, setRemoved] = useState([]);
  const [selected, setSelected] = useState(role.groups.map((group) => ({
    id: group.group_role.id,
    groupId: group.id,
    name: group.name,
    write: group.group_role.write,
    read: group.group_role.read,
    update: group.group_role.update,
    remove: group.group_role.remove,
  })));
  if (submitSuccess) {
    return <Redirect to="/administracion/roles" />;
  }

  const handlePermissionChange = (value, index, key) => {
    const newSelected = [...selected];
    newSelected[index][key] = value;
    setSelected(newSelected);
  };

  const handleAllPermissionChange = (value, index) => {
    const newSelected = [...selected];
    if (value) {
      newSelected[index].write = true;
      newSelected[index].read = true;
      newSelected[index].update = true;
      newSelected[index].remove = true;
    } else {
      newSelected[index].write = false;
      newSelected[index].read = false;
      newSelected[index].update = false;
      newSelected[index].remove = false;
    }
    setSelected(newSelected);
  };

  return (
    <Formik
      initialValues={{
        name: role.name || '',
        groups: role.groups || [],
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Debe ingresar un nombre'),
        // TODO add touch and error for this field
        // groups: Yup.array().min(1).required('Debe seleccionar al menos un grupo'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          // Make API request
          const data = {
            id: role.id,
            name: values.name,
            permissions: selected.map((item) => ({
              id: item.id,
              groupId: item.groupId,
              write: item.write,
              read: item.read,
              update: item.update,
              remove: item.remove,
            })),
            removed: removed.map((item) => ({
              id: item.id,
            })),
          };
          const response = await Request.putRoleById(data);

          const res = response.data;
          if (res.success) {
            setSubmitSuccess(true);
            setStatus({ success: true });
            setSubmitting(false);
            enqueueSnackbar('Cambios guardados', {
              variant: 'success',
            });
          } else {
            setStatus({ success: false });
            setErrors({ submit: res.data.errorMessage });
            enqueueSnackbar(res.data.errorMessage, {
              variant: 'warning',
              action: <Button href="/administracion/roles">Volver a roles</Button>,
            });
          }
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Card>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Nombre"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                ><Grid
                item
                md={6}
                xs={12}
              ><Autocomplete
                  multiple
                  name='groups'
                  options={groups.map((g) => ({
                    name: g.name,
                    groupId: g.id,
                    write: true,
                    read: true,
                    update: true,
                    remove: true,
                  }))}
                  value={selected}
                  disableCloseOnSelect
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => {
                    const difference = selected.filter((x) => !value.includes(x));
                    if (difference.length > 0) {
                      setRemoved((prev) => [...prev, ...difference]);
                    }
                    setSelected(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Grupos"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              {selected.map((g, i) => (
                <Grid key={i} item md={12} xs={12}>
                  <Grid container>
                    <Grid item md={12} xs={12}>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant='h5'>{g.name}:</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      md={2}
                      xs={2}
                    >
                      <Typography >Escritura</Typography>
                      <Checkbox
                        name='write'
                        checked={g.write}
                        onChange={(e) => handlePermissionChange(e.target.checked, i, 'write')}
                      />
                    </Grid>
                    <Grid
                      item
                      md={2}
                      xs={2}
                    >
                      <Typography >Lectura</Typography>
                      <Checkbox
                        name='read'
                        checked={g.read}
                        onChange={(e) => handlePermissionChange(e.target.checked, i, 'read')}
                      />
                    </Grid>
                    <Grid
                      item
                      md={2}
                      xs={2}
                    >
                      <Typography >Actualizar</Typography>
                      <Checkbox
                        name='update'
                        checked={g.update}
                        onChange={(e) => handlePermissionChange(e.target.checked, i, 'update')}
                      />
                    </Grid>
                    <Grid
                      item
                      md={2}
                      xs={2}
                    >
                      <Typography >Borrar</Typography>
                      <Checkbox
                        name='remove'
                        checked={g.remove}
                        onChange={(e) => handlePermissionChange(e.target.checked, i, 'remove')}
                      />
                    </Grid>
                    <Grid
                      item
                      md={2}
                      xs={2}
                    >
                      <Typography >Todos</Typography>
                      <Checkbox
                        name='all'
                        checked={g.write && g.read && g.update && g.remove}
                        onChange={(e) => handleAllPermissionChange(e.target.checked, i)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Guardar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
}

RoleEditForm.propTypes = {
  className: PropTypes.string,
  role: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
};

export default RoleEditForm;
