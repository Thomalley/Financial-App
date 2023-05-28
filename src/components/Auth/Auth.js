import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from '../Loading/SplashScreen';
import AuthService from '../../services/authService';

const { logout, setUserData } = require('../../actions/accountActions');

function Auth({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      AuthService.setAxiosInterceptors({ onLogout: () => dispatch(logout()) });
      AuthService.handleAuthentication();
      if (AuthService.isAuthenticated()) {
        const user = await AuthService.loginInWithToken();
        if (user) {
          await dispatch(setUserData(user));
        } else {
          await dispatch(logout());
        }
      }

      setLoading(false);
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return children;
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
