import AuthService from '../services/authService';
// import { INTERNAL_SERVER_ERROR } from '../constants/http';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const UPDATE_PROFILE = '@account/update-profile';

export function login(email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const response = await AuthService.loginWithEmailAndPassword(email, password);
      if (response.success) {
        const { user } = response;
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
        };
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            userData,
          },
        });
      }
      return response;
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function setUserData(userData) {
  return (dispatch) => dispatch({
    type: SILENT_LOGIN,
    payload: {
      userData,
    },
  });
}

export function logout() {
  return async (dispatch) => {
    AuthService.logoutSession();

    dispatch({
      type: LOGOUT,
    });
  };
}

export function register() {
  return true;
}

export default {
  login,
};
