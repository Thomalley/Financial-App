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
  MenuItem,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Redirect } from 'react-router';
import Request from '../../../requests/api/user';
import { SYSTEM_ADMIN } from '../../../utils/const/user_types';

const useStyles = makeStyles(() => ({
  root: {},
}));

function AdminCreateForm({
  className, roles, companies, roleName, ...rest
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
        email: '',
        name: '',
        lastname: '',
        roleId: roles[0].id || 1,
        phone: '',
        country: '',
        companyId: companies[0]?.id || 1,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Debe ingresar un nombre'),
        lastname: Yup.string().max(255).required('Debe ingresar un apellido'),
        email: Yup.string()
          .email('Email inválido')
          .required('Debe ingresar email'),
        phone: Yup.string().max(255).required('teléfono requerido'),
        country: Yup.string().max(255).required('país requerido'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Make API request
          // const url = '/api/register';
          const data = {
            name: values.name,
            lastname: values.lastname,
            roleId: values.roleId,
            email: values.email,
            phone: values.phone,
            country: values.country,
            companyId: values.companyId,
          };

          const response = await Request.postRegister(data);

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
              action: (
                <Button href="/administracion/usuarios">Volver a usuarios</Button>
              ),
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
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
                { (companies.length && roleName === SYSTEM_ADMIN) ? (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Compañía"
                    name="companyId"
                    onChange={handleChange}
                    select
                    value={values.companyId}
                    variant="outlined"
                  >
                    {companies.map((company, i) => (
                      <MenuItem key={i}
                        value={company.id}
                      >
                        {company.name}
                      </MenuItem>))}
                  </TextField>
                </Grid>
                ) : null}
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

AdminCreateForm.propTypes = {
  className: PropTypes.string,
  roles: PropTypes.array,
  companies: PropTypes.array,
  roleName: PropTypes.string,
};

export default AdminCreateForm;
