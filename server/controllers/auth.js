const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwt');

const {
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
  BAD_REQUEST,
} = require('../utils/const/http');
const { responseGenerator } = require('../utils/responseGenerator');

const isAuthenticated = (req, res, next) => {
  const bearerHeader = req.headers.authorization || null;
  if (!bearerHeader) {
    res
      .status(UNAUTHORIZED.status)
      .json(responseGenerator(UNAUTHORIZED.message));
    return;
  }
  const token = bearerHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err /* , data */) => {
    if (err) {
      res
        .status(UNAUTHORIZED.status)
        .json(responseGenerator(UNAUTHORIZED.status));
      return;
    }

    // data.user has user info signed in postLogin
    // console.log(data);

    /* if (!(data.role.toLowerCase() === 'admin')) {
      res.status(UNAUTHORIZED.status).json(responseGenerator(UNAUTHORIZED.status));
      return;
    } */
    next();
  });
};

const postLogin = async (req, res) => {
  try {
    const { api } = req.app.locals;
    let token;
    const data = {};
    const response = await api.post('/login', req.body);
    if (response.data.success) {
      if (response.data.data.user) {
        token = await jwtUtils.sign(response.data.data.user);
        data.accessToken = token;
        data.user = response.data.data.user;
      }
    }

    res.status(OK.status).json(responseGenerator(OK.status, data));
  } catch (err) {
    const status = err.response
      ? err.response.data.status
      : INTERNAL_SERVER_ERROR.status;
    const errorMessage = err.response && err.response.data
      ? err.response.data.data.errorMessage
      : INTERNAL_SERVER_ERROR.message;
    res.status(status).json(responseGenerator(status, { errorMessage }));
  }
};

// SEND EMAIL WITH RESET PASSWORD TOKEN
const recoverPassword = async (req, res) => {
  const { api } = req.app.locals;
  const { email } = req.body;

  // Verify parameters
  if (!email) {
    res
      .status(OK.status)
      .json(
        responseGenerator(BAD_REQUEST.status, {
          errorMessage: 'Email is required',
        }),
      );
    return;
  }

  try {
    // Create token and update database
    const response = await api.post('/recover-password', { email });

    if (!response.data.success) {
      res.status(OK.status).json(
        responseGenerator(BAD_REQUEST.status, {
          errorMessage: response.data.data.errorMessage,
        }),
      );
      return;
    }

    res.status(OK.status).json(responseGenerator(OK.status, {}));
  } catch (err) {
    const status = err.response
      ? err.response.data.status
      : INTERNAL_SERVER_ERROR.status;
    const errorMessage = err.response && err.response.data
      ? err.response.data.data.errorMessage
      : INTERNAL_SERVER_ERROR.message;
    res.status(status).json(responseGenerator(status, { errorMessage }));
  }
};

// UPDATES PASSWORD
const resetPassword = async (req, res) => {
  const { api } = req.app.locals;
  const { token, password, confirmPassword } = req.body;

  // Verify parameters
  if (!token) {
    res.status(OK.status).json(
      responseGenerator(BAD_REQUEST.status, {
        errorMessage: 'Token not received',
      }),
    );
    return;
  }

  try {
    // Update database
    const response = await api.post('/reset-password', {
      token,
      password,
      confirmPassword,
    });

    if (!response.data.success) {
      res.status(OK.status).json(
        responseGenerator(BAD_REQUEST.status, {
          errorMessage: response.data.data.errorMessage,
        }),
      );
      return;
    }

    res.status(OK.status).json(responseGenerator(OK.status, {}));
  } catch (err) {
    const status = err.response
      ? err.response.data.status
      : INTERNAL_SERVER_ERROR.status;
    const errorMessage = err.response && err.response.data
      ? err.response.data.data.errorMessage
      : INTERNAL_SERVER_ERROR.message;
    res.status(status).json(responseGenerator(status, { errorMessage }));
  }
};

const postRegister = async (req, res) => {
  const { api } = req.app.locals;
  const {
    name, lastname, email, roleId, phone, country,
  } = req.body;
  try {
    const token = req.headers.authorization.split(' ')[1];
    const response = await api.post(
      '/register',
      {
        name,
        lastname,
        email,
        roleId,
        phone,
        country,
      },
      {
        headers: {
          'x-user-token': token,
        },
      },
    );

    if (response.data.success) {
      res
        .status(OK.status)
        .json(responseGenerator(OK.status, response.data.data));
      return;
    }

    res.status(OK.status).json(
      responseGenerator(BAD_REQUEST.status, {
        errorMessage: response.data.data.errorMessage,
      }),
    );
  } catch (err) {
    const status = err.response
      ? err.response.data.status
      : INTERNAL_SERVER_ERROR.status;
    const message = err.response && err.response.data
      ? err.response.data.data.errorMessage
      : INTERNAL_SERVER_ERROR.message;
    res.status(status).json(
      responseGenerator(status, {
        errorMessage: message,
      }),
    );
  }
};

// USER VERIFICATION
const userVerification = async (req, res) => {
  const { api } = req.app.locals;
  const { token, password, confirmPassword } = req.body;

  // Verify parameters
  if (!token) {
    res.status(OK.status).json(
      responseGenerator(BAD_REQUEST.status, {
        errorMessage: 'Token not received',
      }),
    );
    return;
  }

  try {
    // Update database
    const response = await api.post('/user-verification', {
      token,
      password,
      confirmPassword,
    });

    if (!response.data.success) {
      res.status(OK.status).json(
        responseGenerator(BAD_REQUEST.status, {
          errorMessage: response.data.data.errorMessage,
        }),
      );
      return;
    }

    res.status(OK.status).json(responseGenerator(OK.status, {}));
  } catch (err) {
    const status = err.response
      ? err.response.data.status
      : INTERNAL_SERVER_ERROR.status;
    const errorMessage = err.response && err.response.data
      ? err.response.data.data.errorMessage
      : INTERNAL_SERVER_ERROR.message;
    res.status(status).json(responseGenerator(status, { errorMessage }));
  }
};

const getUserById = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { api } = req.app.locals;
    const { id } = req.params;
    const response = await api.get(`/users/${id}`, {
      headers: {
        'x-user-token': token,
      },
    });
    if (response.data.success) {
      res
        .status(OK.status)
        .json(responseGenerator(OK.status, response.data.data));
    }
  } catch (err) {
    const status = err.response
      ? err.response.status
      : INTERNAL_SERVER_ERROR.status;
    const errorMessage = err.response && err.response.data
      ? err.response.data.errorMessage
      : INTERNAL_SERVER_ERROR.message;
    res.status(status).json(responseGenerator(status, { errorMessage }));
  }
};

module.exports = {
  isAuthenticated,
  postLogin,
  recoverPassword,
  resetPassword,
  postRegister,
  userVerification,
  getUserById,
};
