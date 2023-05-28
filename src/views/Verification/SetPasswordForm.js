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
import { useSnackbar, withSnackbar } from 'notistack';
import Request from '../../requests/api/auth';

const useStyles = makeStyles(() => ({
  root: {
    text: {
      color: 'primary',
    },
  },
}));

function SetPasswordForm({
  className, onSubmitSuccess, token, ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSnackbar = (variant, msg) => {
    closeSnackbar();
    if (variant && msg) {
      enqueueSnackbar(msg, {
        variant,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().max(255).required('Contraseña requerida'),
        confirmPassword: Yup.string().max(255).required('Confirmación de contraseña requerida'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          const data = {
            token,
            password: values.password,
            confirmPassword: values.confirmPassword,
          };
          const res = await Request.userVerification(data);

          if (res.status === 200) {
            showSnackbar('success', 'Usuario verificado correctamente, ahora puedes ingresar a la plataforma.');
            setStatus({ success: true });
            setSubmitting(false);
            onSubmitSuccess();
          } else {
            showSnackbar('error', 'Hubo un error en la verificación.');
            const { message } = res;
            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        } catch (error) {
          showSnackbar('error', 'Hubo un error interno en la verificación, intenta nuevamente más tarde.');
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
            error={Boolean(touched.password && errors.password)}
            fullWidth
            autoFocus
            helperText={touched.password && errors.password}
            label="Contraseña"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="standard"
          />
          <TextField
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            fullWidth
            helperText={touched.confirmPassword && errors.confirmPassword}
            label="Confirmar contraseña"
            margin="normal"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.confirmPassword}
            variant="standard"
          />
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Verificar cuenta
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

SetPasswordForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
  token: PropTypes.string,
};

SetPasswordForm.defaultProps = {
  onSubmitSuccess: () => {},
};

export default withSnackbar(SetPasswordForm);
