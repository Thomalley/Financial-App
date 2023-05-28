const {
  INTERNAL_SERVER_ERROR,
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require('../utils/const/http');
const { responseGenerator } = require('../utils/responseGenerator');

const getUsersPerPage = async (req, res) => {
  const { api } = req.app.locals;
  const { limit, page, searchValue } = req.query;

  try {
    const token = req.headers.authorization.split(' ')[1];
    const response = await api.get(
      `/users?page=${page}&limit=${limit}&searchValue=${searchValue}`,
      {
        headers: {
          'x-user-token': token,
        },
      },
    );

    // if the user does not have permissions
    if (response.data.status === UNAUTHORIZED.status) {
      res
        .status(OK.status)
        .json(
          responseGenerator(UNAUTHORIZED.status, { message: 'No autorizado' }),
        );
    }

    if (response.data.success) {
      if (response.data.data) {
        res
          .status(OK.status)
          .json(responseGenerator(OK.status, response.data.data));
      }
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

const editUserRoleAndStatus = async (req, res) => {
  const { api } = req.app.locals;
  const {
    id, updatedStatus, updatedRole, dni, fullName, password,
  } = req.body;

  try {
    if (!id || updatedStatus === null || !updatedRole || !fullName || !dni) {
      res.status(BAD_REQUEST.status).json(
        responseGenerator(BAD_REQUEST.status, {
          errorMessage: 'Id, status and role are required',
        }),
      );
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const response = await api.put(
      '/users',
      {
        id,
        updatedStatus,
        updatedRole,
        dni,
        fullName,
        password,
      },
      {
        headers: {
          'x-user-token': token,
        },
      },
    );
    if (response.data.success) {
      if (response.data.data) {
        res
          .status(OK.status)
          .json(responseGenerator(OK.status, response.data.data));
      }
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

const postCreateUser = async (req, res) => {
  const { api } = req.app.locals;
  const {
    name, lastname, email, password, role, phone, country,
  } = req.body;
  try {
    if (!name || !lastname || !email || !password || !role || !phone || !country) {
      res.status(BAD_REQUEST.status).json(
        responseGenerator(BAD_REQUEST.status, {
          errorMessage: 'Missing parameters',
        }),
      );
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const response = await api.post(
      '/developer/create',
      {
        name,
        lastname,
        email,
        password,
        role,
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

const putUserById = async (req, res) => {
  const { api } = req.app.locals;
  const {
    id, name, lastname, email, roleId, phone, country,
  } = req.body;
  try {
    const token = req.headers.authorization.split(' ')[1];
    const response = await api.put(
      '/user/edit',
      {
        id,
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

const deleteUser = async (req, res) => {
  const { api } = req.app.locals;
  const { id } = req.params;

  try {
    const token = req.headers.authorization.split(' ')[1];
    const response = await api.delete(`/user/${id}`, {
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

const getAllUsers = async (req, res) => {
  const { api } = req.app.locals;

  try {
    const token = req.headers.authorization.split(' ')[1];
    const response = await api.get(
      '/all/users',
      {
        headers: {
          'x-user-token': token,
        },
      },
    );

    // if the user does not have permissions
    if (response.data.status === UNAUTHORIZED.status) {
      res
        .status(OK.status)
        .json(
          responseGenerator(UNAUTHORIZED.status, { message: 'No autorizado' }),
        );
    }

    if (response.data.success) {
      if (response.data.data) {
        res
          .status(OK.status)
          .json(responseGenerator(OK.status, response.data.data));
      }
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

const getUsersByRole = async (req, res) => {
  const { api } = req.app.locals;
  const { roleId } = req.params;

  try {
    const token = req.headers.authorization.split(' ')[1];
    const response = await api.get(`/users/role/${roleId}`, {
      headers: {
        'x-user-token': token,
      },
    });

    // if the user does not have permissions
    if (response.data.status === UNAUTHORIZED.status) {
      res.status(OK.status).json(responseGenerator(UNAUTHORIZED.status, { message: 'No autorizado' }));
    }

    if (response.data.success) {
      if (response.data.data) {
        res.status(OK.status).json(responseGenerator(OK.status, response.data.data));
      }
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
  getUsersPerPage,
  editUserRoleAndStatus,
  postCreateUser,
  putUserById,
  deleteUser,
  getAllUsers,
  getUsersByRole,
};
