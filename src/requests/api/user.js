import axios from '../../utils/axios';

const putUserById = async (
  {
    id,
    active,
    name,
    lastname,
    email,
    deleted,
  },
) => {
  const response = await axios.put('/api/user/edit', {
    id,
    active,
    name,
    lastname,
    email,
    deleted,
  });
  return response.data;
};

const getUserById = async (userId) => {
  const response = await axios.get(`/api/user/${userId}`);
  return response.data;
};

const postRegister = async (email,
  name,
  lastname,
  password) => {
  const response = await axios.post('/api/user/create', {
    email,
    name,
    lastname,
    password,
  });
  return response.data;
};

const postLogin = async (email, password) => {
  const response = await axios.post('/api/login', {
    email,
    password,
  });
  return response.data;
};

export default {
  putUserById,
  getUserById,
  postRegister,
  postLogin,
};
