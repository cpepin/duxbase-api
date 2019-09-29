import React, { useMemo } from 'react';

import AuthContext from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import { auth } from '../constants/routes';
import LoadingSkeleton from '../components/LoadingSkeleton';

const AuthProvider = ({ children, initialUser, initialError }) => {
  const [_, isLoading, user] = useFetch(auth.me, {
    immediate: true,
    initialValue: initialUser,
    initialError,
  });

  const value = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <LoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
