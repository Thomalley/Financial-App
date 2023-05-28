import { useSelector } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

function AuthGuard({ children }) {
  const account = useSelector((state) => state.account);

  if (!account.user) {
    return <Redirect to="/login" />;
  }
  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
