const {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('./const/http');

const responseGenerator = (code = OK.status, data = null) => {
  switch (code) {
    case OK.status: {
      return {
        success: true,
        status: OK.status,
        message: OK.message,
        data,
      };
    }

    case CREATED.status: {
      return {
        success: true,
        status: CREATED.status,
        message: CREATED.message,
        data,
      };
    }

    case BAD_REQUEST.status: {
      return {
        success: false,
        status: BAD_REQUEST.status,
        message: BAD_REQUEST.message,
        data,
      };
    }

    case UNAUTHORIZED.status: {
      return {
        success: false,
        status: UNAUTHORIZED.status,
        message: UNAUTHORIZED.message,
        data,
      };
    }

    case FORBIDDEN.status: {
      return {
        success: false,
        status: FORBIDDEN.status,
        message: FORBIDDEN.message,
        data,
      };
    }

    case NOT_FOUND.status: {
      return {
        success: false,
        status: NOT_FOUND.status,
        message: NOT_FOUND.message,
        data,
      };
    }

    case INTERNAL_SERVER_ERROR.status: {
      return {
        success: false,
        status: INTERNAL_SERVER_ERROR.status,
        message: INTERNAL_SERVER_ERROR.message,
        data,
      };
    }

    default:
      return {
        success: true,
        status: OK.status,
        message: OK.message,
        data: null,
      };
  }
};

module.exports = {
  responseGenerator,
};
