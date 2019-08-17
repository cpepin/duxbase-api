import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';

function useFetch(url, options = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState();

  const call = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const token = Cookies.get('squad-leader-session') || '';
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        ...options,
      };

      if (data) {
        requestOptions.body = JSON.stringify(data);
      }

      const response = await fetch(url, requestOptions);

      const responseJson = await response.json();

      if (response.ok) {
        setResult(responseJson);
      } else {
        setError(responseJson);
      }
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return [call, isLoading, result, error];
}

export default useFetch