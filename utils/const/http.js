const OK = { status: 200, message: 'OK' };
const CREATED = { status: 201, message: 'Created' };

const BAD_REQUEST = { status: 400, message: 'Bad Request' };
const UNAUTHORIZED = { status: 401, message: 'Unauthorized' };
const FORBIDDEN = { status: 403, message: 'Forbidden' };
const NOT_FOUND = { status: 404, message: 'Not Found' };

const INTERNAL_SERVER_ERROR = { status: 500, message: 'Internal Server Error' };

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
};
