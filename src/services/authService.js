import jwtDecode from 'jwt-decode';
import axios from '../utils/axios';
import Request from '../requests/api/user';
import {
  UNKNOWN_ERROR,
} from '../utils/const/errors';

const getAccessToken = () => localStorage.getItem('accessToken');

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const { id } = jwtDecode(accessToken);
    localStorage.setItem('userId', id);
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const setAxiosInterceptors = ({ onLogout }) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (onLogout) {
          setSession(null);
          onLogout();
        }
      }

      return Promise.reject(error);
    },
  );
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const response = await Request.postLogin({
      email,
      password,
    });
    let user;
    let accessToken;
    if (response.success) {
      ({ accessToken, user } = response);
      setSession(accessToken);
      return {
        user,
        success: true,
      };
    }
    setSession(null);
    return {
      success: false,
      errorMessage: response.data.errorMessage,
    };
  } catch (err) {
    return {
      success: false,
      errorMessage: UNKNOWN_ERROR,
    };
  }
};

const logoutSession = () => {
  setSession(null);
};

const loginInWithToken = async () => {
  const accessToken = getAccessToken();
  const { id } = jwtDecode(accessToken)?.user || {};
  try {
    const response = await Request.getUserById(id);
    if (response.status !== 200) {
      logoutSession();
      return null;
    }
    return (response.data.data.user) || null;
  } catch (err) {
    return null;
  }
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleAuthentication = () => {
  // localStorage.clear();
  const accessToken = getAccessToken();
  if (!accessToken) {
    setSession(null);
    return;
  }

  if (isValidToken(accessToken)) {
    setSession(accessToken);
  } else {
    setSession(null);
  }
};

const isAuthenticated = () => !!getAccessToken();

export default {
  setAxiosInterceptors,
  loginWithEmailAndPassword,
  loginInWithToken,
  logoutSession,
  handleAuthentication,
  isAuthenticated,
  setSession,
};
