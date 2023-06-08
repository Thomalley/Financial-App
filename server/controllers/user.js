const { OK } = require('../utils/const/http');
const { errorResponse } = require('../utils/errorResponse');
const jwtUtils = require('../utils/jwt');

const postLogin = async (req, res) => {
  try {
    const { api } = req.app.locals;
    let token;
    const data = {};
    const { email, password } = req.body;
    const response = await api.post('/login', email, password);
    if (response.data.success) {
      if (response.data.user) {
        token = await jwtUtils.sign(response.data.user);
        data.accessToken = token;
        data.user = response.data.user;
      }
    }

    res.status(OK.status).json(response.data);
  } catch (err) {
    errorResponse(err, res);
  }
};

const postRegister = async (req, res) => {
  const { api } = req.app.locals;
  const {
    name, lastname, email, password,
  } = req.body;
  try {
    const response = await api.post(
      '/user/create',
      {
        name,
        lastname,
        email,
        password,
      },
    );
    res.status(OK.status).json(response.data);
  } catch (err) {
    errorResponse(err, res);
  }
};

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

    res.status(OK.status).json(response.data);
  } catch (err) {
    errorResponse(err, res);
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
    res.status(OK.status).json(response.data);
  } catch (err) {
    errorResponse(err, res);
  }
};

module.exports = {
  putUserById,
  getUserById,
  postLogin,
  postRegister,
};
