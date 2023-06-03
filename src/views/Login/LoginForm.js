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

import { useDispatch } from 'react-redux';

import accountActions from '../../actions/accountActions';

const useStyles = makeStyles(() => ({
  root: {},
}));

function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email requerido'),
        password: Yup.string().max(255).required('Contraseña requerida'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          await dispatch(accountActions.login(values.email, values.password));
          onSubmitSuccess();
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
          <Box mt={2}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Iniciar Sesión
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

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {},
};

export default LoginForm;
