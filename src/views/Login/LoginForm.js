import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Toaster, toast } from 'sonner';
import { login } from '../../actions/accountActions';
import handleApiResponse from '../../utils/handleApiResponse';

function LoginForm({ ...rest }) {
  const dispatch = useDispatch();

  const handleOnSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await dispatch(login(values.email, values.password));
      setSubmitting(false);
      if (response.success) {
        toast.success('Sesión iniciada');
      } else {
        toast.error('Ha ocurrido un error', {
          description: `${response.errorMessage}`,
        });
      }
    } catch (error) {
      handleApiResponse(toast, error, false);
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
          onSubmit={handleSubmit}
          {...rest}
        >
          <Toaster position="bottom-right" richColors />
          <TextField
            error={Boolean(touched.email && errors.email)}
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
              color='primary'
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

export default LoginForm;
