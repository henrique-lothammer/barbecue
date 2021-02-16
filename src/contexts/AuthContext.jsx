import React, { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem('@barbecue:logged');
    return isLogged;
  });

  const signIn = useCallback((data) => {
    if (data.login && data.password) {
      localStorage.setItem('@barbecue:logged', true);

      setLogged(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ logged, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
