export const user = {
  register: '/api/users/',
};

export const auth = {
  me: () => process.env.BASE_URL ? `${process.env.BASE_URL}/api/auth/me` : '/api/auth/me',
  login: '/api/auth/login',
};

