const jwt = require('jsonwebtoken');

const { expiresInAccessToken } = require('../constants/jwt');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const getAccessToken = data => jwt.sign(data, ACCESS_TOKEN_SECRET, {
  expiresIn: expiresInAccessToken
});
const verifyAccessToken = token => jwt.verify(token, ACCESS_TOKEN_SECRET);

const getRefreshToken = data => jwt.sign(data, REFRESH_TOKEN_SECRET);
const verifyRefreshToken = token => jwt.verify(token, REFRESH_TOKEN_SECRET);

module.exports = {
  getAccessToken,
  getRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
