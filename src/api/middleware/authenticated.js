const boom = require('boom');

const asyncMiddleware = require('./asyncMiddleware');
const { verifyJwt } = require('../utils/jwt');

const authenticated = asyncMiddleware(async (req, _, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    const accessToken = authorization.split(' ')[1];

    try {
      const user = await verifyJwt(accessToken);
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
