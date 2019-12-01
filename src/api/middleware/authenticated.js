const boom = require('boom');

const asyncMiddleware = require('./asyncMiddleware');
const { verifyAccessToken, verifyRefreshToken, getAccessToken } = require('../utils/jwt');

const authenticated = asyncMiddleware(async (req, res, next) => {
  const { authorization, 'x-refresh-token': refreshToken } = req.headers;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    const accessToken = authorization.split(' ')[1];

    try {
      const user = await verifyAccessToken(accessToken);

      // if the user has provided a refresh token, attempt to
      // generate a new access token
      if (refreshToken) {
        await verifyRefreshToken(refreshToken);
        res.header('x-access-token', getAccessToken(user));
      }

      req.user = user;
    } catch (e) {
      throw boom.unauthorized('User is not authorized.');
    }
  } else {
    throw boom.unauthorized('User is unauthenticated.');
  }

  next();
});

module.exports = authenticated;
