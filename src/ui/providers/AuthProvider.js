import React, { useState, useEffect } from 'react';

import AuthContext from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import { auth } from '../constants/routes';

const AuthProvider = ({ children, initialUser, failedPreLoad }) => {
  const [user, setUser] = useState(initialUser);
  const [getUser, isLoading, result] = useFetch(auth.me);
  const value = { user, setUser };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!user && !failedPreLoad) {
      setUser(result);
    }
  }, [result]);

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? 'loading...' : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
