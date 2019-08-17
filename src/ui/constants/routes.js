const BASE_URL = process.env.BASE_URL;

export const user = {
  register: '/api/users/',
};

export const auth = {
  me: BASE_URL ? `${BASE_URL}/api/auth/me` : '/api/auth/me',
};

