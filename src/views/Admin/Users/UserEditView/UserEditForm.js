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
  MenuItem,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Request from '../../../../requests/api/user';

const useStyles = makeStyles(() => ({
  root: {},
}));

function AdminEditForm({
  className,
  admin,
  roles,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to="/administracion/usuarios" />;
  }
  return (
    <Formik
      initialValues={{
        name: admin.name || '',
        lastname: admin.lastname || '',
        roleId: admin.roleId || '',
        email: admin.email || '',
        phone: admin.phone || '',
        country: admin.country || '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Debe ingresar un nombre'),
        lastname: Yup.string().max(255).required('Debe ingresar un apellido'),
        email: Yup.string().email('Email inválido').required('Debe ingresar email'),
        roleId: Yup.string().max(255).required('Debe ingresar un rol'),
        phone: Yup.string().max(255).required('teléfono requerido'),
        country: Yup.string().max(255).required('país requerido'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          // Make API request
          const data = {
            id: admin.id,
            name: values.name,
            lastname: values.lastname,
            roleId: values.roleId,
            email: values.email,
            phone: values.phone,
            country: values.country,
          };

          const response = await Request.putUserById(data);

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
              action: <Button href="/administracion/usuarios">Volver a usuarios</Button>,
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
                >
                  <TextField
                    error={Boolean(touched.lastname && errors.lastname)}
                    fullWidth
                    helperText={touched.lastname && errors.lastname}
                    label="Apellido"
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.lastname}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Rol"
                    name="roleId"
                    onChange={handleChange}
                    select
                    value={values.roleId}
                    variant="outlined"
                  >
                    {roles.map((role, i) => (
                      <MenuItem key={i}
                        value={role.id}
                      >
                        {role.name}
                      </MenuItem>))}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    color="secondary"
                    helperText={touched.phone && errors.name}
                    label="Teléfono"
                    margin="normal"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="phone"
                    value={values.phone}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.country && errors.country)}
                    fullWidth
                    color="secondary"
                    helperText={touched.country && errors.country}
                    label="País"
                    margin="normal"
                    name="country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="country"
                    required
                    value={values.country}
                    variant="outlined"
                  />
                </Grid>
                <Grid item />
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

AdminEditForm.propTypes = {
  className: PropTypes.string,
  admin: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
};

export default AdminEditForm;
