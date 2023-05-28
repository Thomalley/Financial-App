const responseGenerator = (code, data) => {
  let message;
  let success = false;
  switch (code) {
    default:
      message = 'Failed';
      success = 'False';
      break;
    case 200:
      message = 'OK';
      success = true;
      break;
    case 201:
      message = 'Created';
      success = true;
      break;
    case 400:
      message = 'Bad Request';
      success = false;
      break;
    case 404:
      message = 'Not Found';
      success = false;
      break;
    case 401:
      message = 'Unauthorized';
      success = false;
      break;
    case 500:
      message = 'Internal Server Error';
      success = false;
      break;
  }

  return {
    code,
    success,
    message,
    data,
  };
};

const thousandSeparator = (num, separator) => {
  if (!num) return 0;
  if (!separator) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

module.exports = {
  responseGenerator,
  thousandSeparator,
};
