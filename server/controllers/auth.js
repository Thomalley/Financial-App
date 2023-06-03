const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/errorResponse');
const { UNAUTHORIZED } = require('../utils/const/http');

const isAuthenticated = (req, res, next) => {
  const bearerHeader = req.headers.authorization || null;
  if (!bearerHeader) {
    res.status(UNAUTHORIZED.status).json(UNAUTHORIZED.message);
    return;
  }
  const token = bearerHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err) => {
    if (err) {
      errorResponse(err, res);
      return;
    }
    next();
  });
};

module.exports = {
  isAuthenticated,
};
