const handleApiResponse = (
  toast,
  response,
  success,
) => {
  if (success) {
    toast.success(response.message || response.data.message);
  } else {
    toast.error(response.response.data.error || response.response.data.message);
  }
};

export default handleApiResponse;
