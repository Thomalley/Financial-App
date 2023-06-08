import React from 'react';
import { Toaster, toast } from 'sonner';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  Typography,
} from '@mui/material';
import handleApiResponse from '../../utils/handleApiResponse';
import userRequest from '../../requests/api/user';

function RegisterForm({ ...rest }) {
  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        setSubmitting,
        setStatus,
      }) => {
        try {
          if (values.password === values.confirmPassword) {
            const response = await userRequest.postRegister({
              email: values.email,
              name: values.name,
              lastname: values.lastname,
              password: values.password,
            });
            if (response.success) {
              toast.success('Registro exitoso!');
            }
          } else {
            setErrors({ confirmPassword: 'Las contraseñas no coinciden.' });
            toast.error('Las contraseñas no coinciden!');
          }
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.errorMessage });
          setSubmitting(false);
          handleApiResponse(toast, error, false);
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
          onSubmit={handleSubmit}
          {...rest}
        >
          <Toaster position="bottom-right" richColors />
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

export default RegisterForm;
