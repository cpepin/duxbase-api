import useFetch from './useFetch';

function usePost(url, options = {}) {
  return useFetch(url, {
    method: 'POST',
    ...options,
  });
}

export default usePost;
