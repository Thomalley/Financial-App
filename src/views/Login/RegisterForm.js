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
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {},
}));

function RegisterForm({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Por favor, ingresa tu nombre'),
        lastname: Yup.string().required('Por favor, ingresa tu apellido'),
        email: Yup.string().required('Por favor, ingresá tu email.'),
        password: Yup.string().max(255).required('Por favr, ingresá una contraseña.'),
        confirmPassword: Yup.string().max(255).required('Por favor, repetí tu contraseña'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          // await dispatch(accountAction
          // .login(values.email, values.password));Yup.string().required
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
            color="secondary"
            fullWidth
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
            color="secondary"
            fullWidth
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
            color="secondary"
            fullWidth
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
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            fullWidth
            color="secondary"
            helperText={touched.confirmPassword && errors.confirmPassword}
            label="Confirmar contraseña"
            margin="normal"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            inputMode='password'
            value={values.confirmPassword}
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
              <Typography
                variant='loginButton'>
                Registrarse
              </Typography>
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
};

export default RegisterForm;
