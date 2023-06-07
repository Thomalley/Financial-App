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
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/accountActions';
import handleApiResponse from '../../utils/handleApiResponse';

const useStyles = makeStyles(() => ({
  root: {},
}));

function LoginForm({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values.email, values.password));
      setSubmitting(false);
    } catch (error) {
      handleApiResponse(enqueueSnackbar, error, false);
      setSubmitting(false);
    }
  };

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
      onSubmit={handleOnSubmit}
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
            inputMode='email'
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
            inputMode='password'
            value={values.password}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              disabled={isSubmitting}
              color= 'primary'
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              <Typography
              variant='loginButton'>
              Iniciar Sesión
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

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
