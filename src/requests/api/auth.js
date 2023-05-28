import axios from '../../utils/axios';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '../../constants/http';

const postLogin = async ({
  email, password,
}) => {
  try {
    const response = await axios.post('/api/auth/login', {
      email,
      password,
    });

    return {
      success: true,
      status: OK.status,
      message: OK.message,
      data: response.data,
    };
  } catch (err) {
    const status = err.response ? err.response.status : INTERNAL_SERVER_ERROR.status;
    const message = err.response && err.response.data
      ? err.response.data.data.errorMessage : INTERNAL_SERVER_ERROR.message;
    return {
      success: false,
      status,
      message,
      data: {
        errorMessage: message,
      },
    };
  }
};

const postRegister = async ({
  name, lastname, email, roleId, phone, country,
}) => {
  try {
    const response = await axios.post('/api/auth/register', {
      name, lastname, email, roleId, phone, country,
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
      err,
      success: false,
      status,
      message,
      data: {
        errorMessage: 'Ha ocurrido un error. Por favor intente nuevamente en unos minutos.',
      },
    };
  }
};

// RECOVER PASSWORD
const postRecoverPassword = async (email) => {
  try {
    const response = await axios.post('/api/auth/recover-password', {
      email,
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

// UPDATE PASSWORD
const updatePassword = async ({ token, password, confirmPassword }) => {
  try {
    const response = await axios.post('/api/auth/reset-password', {
      token,
      password,
      confirmPassword,
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

// USER VERIFICATION
const userVerification = async ({ token, password, confirmPassword }) => {
  try {
    const response = await axios.post('/api/auth/user-verification', {
      token,
      password,
      confirmPassword,
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

// OBTAINING ACTIVE USER DATA
const getUserById = async (userId) => {
  try {
    const response = await axios.get(`/api/auth/users/${userId}`);

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

export default {
  postLogin,
  postRegister,
  postRecoverPassword,
  updatePassword,
  userVerification,
  getUserById,
};
