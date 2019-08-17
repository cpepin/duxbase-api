import React, { useEffect } from 'react';
import { Frame, AppProvider, TopBar } from '@shopify/polaris';
import { useRouter } from 'next/router';

import useAuth from '../hooks/useAuth';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Protected = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, []);

  return (
    <AppProvider>
      <Frame topBar={<TopBar />}>
        {user ? children : <LoadingSkeleton />}
      </Frame>
    </AppProvider>
  );
};

export default Protected;
