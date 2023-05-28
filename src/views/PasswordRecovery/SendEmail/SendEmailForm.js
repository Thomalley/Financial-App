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

import requests from '../../../requests/api/auth';

const useStyles = makeStyles(() => ({
  root: {},
}));

function SendEmailForm({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email requerido'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          const response = await requests.postRecoverPassword(values.email);
          if (response.success) {
            // eslint-disable-next-line no-alert
            alert('Correo enviado');
          } else {
            setErrors({ message: response.message });
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
          <Box mt={2}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Enviar
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

SendEmailForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
};

SendEmailForm.defaultProps = {
  onSubmitSuccess: () => {},
};

export default SendEmailForm;
