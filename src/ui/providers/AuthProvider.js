import React, { useState, useEffect, useLayoutEffect } from 'react';

import AuthContext from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import { auth } from '../constants/routes';
import LoadingSkeleton from '../components/LoadingSkeleton';

const AuthProvider = ({ children, initialUser, failedPreLoad }) => {
  const [user, setUser] = useState(initialUser);
  const [isMounted, setIsMounted] = useState(false);
  const [getUser, isLoading, result] = useFetch(auth.me);
  const value = { user, setUser };

  const needsRetry = !user && !failedPreLoad;

  useEffect(() => {
    if (result) {
      setUser(result);
    }
  }, [result]);

  useEffect(() => {
    if (needsRetry) {
      getUser();
    }
    setIsMounted(true);
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {isLoading && isMounted ? <LoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
