const handleApiResponse = (
  enqueueSnackbar,
  response,
  successSnackbar,
  variant = null,
  action = null,
) => {
  if (successSnackbar) {
    enqueueSnackbar(response.message || response.data.message, {
      variant: variant || 'success',
      action,
    });
  } else {
    enqueueSnackbar(response.response.data.error || response.response.data.message, {
      variant: variant || 'error',
      action,
    });
  }
};

export default handleApiResponse;
