const jwt = require('jsonwebtoken');

const { expiresIn } = require('../constants/jwt');
const JWT_SECRET = process.env.JWT_SECRET;

const getJwt = data => jwt.sign(data, JWT_SECRET, { expiresIn });
const verifyJwt = token => jwt.verify(token, JWT_SECRET);

module.exports = { getJwt, verifyJwt };
