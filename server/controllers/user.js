const {
  INTERNAL_SERVER_ERROR,
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require('../utils/const/http');
const { responseGenerator } = require('../utils/responseGenerator');

const putUserById = async (req, res) => {
  const { api } = req.app.locals;
  const {
    id, name, lastname, email, active, deleted,
  } = req.body;
  try {
    const token = req.headers.authorization.split(' ')[1];
    const response = await api.put(
      '/user/edit',
      {
        id,
        active,
        name,
        lastname,
        email,
        deleted,
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

const getUserById = async (req, res) => {
  const { api } = req.app.locals;
  const { id } = req.params;

  try {
    const token = req.headers.authorization.split(' ')[1];
    const response = await api.get(`/user/${id}`, {
      headers: {
        'x-user-token': token,
      },
    });

    // if the user does not have permissions
    if (response.data.status === UNAUTHORIZED.status) {
      res
        .status(OK.status)
        .json(
          responseGenerator(UNAUTHORIZED.status, { message: 'No autorizado' }),
        );
    }

    if (response.data.success) {
      res
        .status(OK.status)
        .json(responseGenerator(OK.status, response.data.data));
    }
  } catch (err) {
    const status = err.response
      ? err.response.status
      : INTERNAL_SERVER_ERROR.status;
    const errorMessage = err.response && err.response.statusText
      ? err.response.data.errorMessage
      : INTERNAL_SERVER_ERROR.message;
    res.status(status).json(responseGenerator(status, { errorMessage }));
  }
};
module.exports = {
  putUserById,
  getUserById,
};
