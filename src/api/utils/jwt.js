const jwt = require('jsonwebtoken');

const { expiresInAccessToken } = require('../constants/jwt');
const JWT_SECRET = process.env.JWT_SECRET;

const getAccessToken = data => jwt.sign(data, JWT_SECRET, {
  expiresIn: expiresInAccessToken
});

const getRefreshToken = data => jwt.sign(data, JWT_SECRET);

const verifyToken = token => jwt.verify(token, JWT_SECRET);

module.exports = { getAccessToken, getRefreshToken, verifyToken };
