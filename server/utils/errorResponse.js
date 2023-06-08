const {
  INTERNAL_SERVER_ERROR,
} = require('./const/http');

const errorResponse = (err, res) => {
  const status = err.response ? err.response.status : INTERNAL_SERVER_ERROR.status;
  const errorMessage = err.response && err.response.data
    ? err.response.data.message : INTERNAL_SERVER_ERROR.message;
  res.status(status).json({ errorMessage });
};

module.exports = {
  errorResponse,
};
