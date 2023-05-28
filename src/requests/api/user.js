import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '../../constants/http';
import axios from '../../utils/axios';

const getUsersPerPage = async (page, limit, searchValue) => {
  try {
    const { data } = await axios.get(`/api/admin/users?page=${page}&limit=${limit}&searchValue=${searchValue}`);
    return {
      success: data.success,
      status: data.status,
      message: data.message,
      data,
    };
  } catch (err) {
    const status = err.response ? err.response.status : INTERNAL_SERVER_ERROR.status;
    const message = err.response ? err.response.statusText : INTERNAL_SERVER_ERROR.message;
    return {
      success: false,
      status,
      message,
      data: {
        errorMessage: 'Ha ocurrido un error. Por favor intente nuevamente en unos minutos.',
      },
    };
  }
};

const postCreateUser = async ({
  name, lastname, email, role, phone, country,
}) => {
  try {
    const response = await axios.post('/api/user/create', {
      name, lastname, email, role, phone, country,
    });
    if (response.data.success) {
      return {
        success: true,
        status: OK.status,
        message: OK.message,
        data: response.data,
      };
    }

    return {
      success: false,
      status: BAD_REQUEST.status,
      message: response.data.data.errorMessage,
      data: {},
    };
  } catch (err) {
    const status = err.response ? err.response.status : INTERNAL_SERVER_ERROR.status;
    const message = err.response
      ? err.response.data.data.errorMessage : INTERNAL_SERVER_ERROR.message;

    return {
      success: false,
      status,
      message,
      data: {
        errorMessage: 'Ha ocurrido un error. Por favor intente nuevamente en unos minutos.',
      },
    };
  }
};

const putUserById = async (
  {
    id, name, lastname, email, roleId, phone, country,
  },
) => {
  try {
    const response = await axios.put('/api/user/edit', {
      id, name, lastname, email, roleId, phone, country,
    });
    if (response.data.success) {
      return {
        success: true,
        status: OK.status,
        message: OK.message,
        data: response.data,
      };
    }

    return {
      success: false,
      status: BAD_REQUEST.status,
      message: response.data.data.errorMessage,
      data: {},
    };
  } catch (err) {
    const status = err.response ? err.response.status : INTERNAL_SERVER_ERROR.status;
    const message = err.response
      ? err.response.data.data.errorMessage : INTERNAL_SERVER_ERROR.message;

    return {
      success: false,
      status,
      message,
      data: {
        errorMessage: 'Ha ocurrido un error. Por favor intente nuevamente en unos minutos.',
      },
    };
  }
};

const getUserById = async (id) => {
  try {
    const { data } = await axios.get(`/api/auth/users/${id}`);

    return {
      success: data.success,
      status: data.status,
      message: data.message,
      data,
    };
  } catch (err) {
    const status = err.response ? err.response.status : INTERNAL_SERVER_ERROR.status;
    const message = err.response ? err.response.statusText : INTERNAL_SERVER_ERROR.message;
    return {
      success: false,
      status,
      message,
      data: {
        errorMessage: 'Ha ocurrido un error. Por favor intente nuevamente en unos minutos.',
      },
    };
  }
};

const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`/api/user/${id}`);

    return {
      success: data.success,
      status: data.status,
      message: data.message,
      data,
    };
  } catch (err) {
    const status = err.response ? err.response.status : INTERNAL_SERVER_ERROR.status;
    const message = err.response ? err.response.statusText : INTERNAL_SERVER_ERROR.message;
    return {
      success: false,
      status,
      message,
      data: {
        errorMessage: 'Ha ocurrido un error. Por favor intente nuevamente en unos minutos.',
      },
    };
  }
};

const getAllUsers = async () => {
  try {
    const { data } = await axios.get('/api/all/users');

    return {
      success: data.success,
      status: data.status,
      message: data.message,
      data,
    };
  } catch (err) {
    const status = err.response ? err.response.status : INTERNAL_SERVER_ERROR.status;
    const message = err.response ? err.response.statusText : INTERNAL_SERVER_ERROR.message;
    return {
      success: false,
      status,
      message,
      data: {
        errorMessage: 'Ha ocurrido un error. Por favor intente nuevamente en unos minutos.',
      },
    };
  }
};

const getUserByRoleId = async (roleId) => {
  try {
    const { data } = await axios.get(`/api/users/role/${roleId}`);

    return {
      success: data.success,
      status: data.status,
      message: data.message,
      data,
    };
  } catch (err) {
    const status = err.response ? err.response.status : INTERNAL_SERVER_ERROR.status;
    const message = err.response ? err.response.statusText : INTERNAL_SERVER_ERROR.message;
    return {
      success: false,
      status,
      message,
      data: {
        errorMessage: 'Ha ocurrido un error. Por favor intente nuevamente en unos minutos.',
      },
    };
  }
};

export default {
  getUsersPerPage,
  postCreateUser,
  putUserById,
  getUserById,
  deleteUser,
  getAllUsers,
  getUserByRoleId,
};
