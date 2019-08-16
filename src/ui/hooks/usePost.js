import { useState } from 'react';
import unfetch from 'unfetch';

function usePost(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState();

  const call = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await unfetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

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

export default usePost;
