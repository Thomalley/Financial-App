import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  makeStyles,
} from '@material-ui/core';

import AuthService from '../../services/authService';

// import { useDispatch } from 'react-redux';

// const { login } = require('../../actions/accountActions');

const useStyles = makeStyles(() => ({
  root: {},
}));

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  // const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        country: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('nombre requerido'),
        lastname: Yup.string().max(255).required('apellido requerido'),
        email: Yup.string().max(255).required('Email requerido'),
        password: Yup.string().max(255).required('Contraseña requerida'),
        phone: Yup.string().max(255).required('teléfono requerido'),
        country: Yup.string().max(255).required('país requerido'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          const response = await
          AuthService.register(
            values.name,
            values.lastname,
            values.email,
            values.password,
            values.phone,
            values.country,
          );
          if (!response.success) {
            const message = response.errorMessage;
            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          } else {
            onSubmitSuccess();
          }
        } catch (error) {
          const message = error.errorMessage || 'Ha ocurrido un error. Por favor intente nuevamente más tarde.';
          setStatus({ success: false });
          setErrors({ submit: message });
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
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            color="secondary"
            helperText={touched.name && errors.name}
            label="Nombre"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            type="name"
            value={values.name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.lastname && errors.lastname)}
            fullWidth
            color="secondary"
            helperText={touched.lastname && errors.lastname}
            label="Apellido"
            margin="normal"
            name="lastname"
            onBlur={handleBlur}
            onChange={handleChange}
            type="lastname"
            value={values.lastname}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            color="secondary"
            helperText={touched.email && errors.email}
            label="Email"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            color="secondary"
            helperText={touched.password && errors.password}
            label="Contraseña"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
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
            variant="outlined"
          />
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
            value={values.country}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Registrarse
            </Button>
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmitSuccess: () => {},
};

export default RegisterForm;
