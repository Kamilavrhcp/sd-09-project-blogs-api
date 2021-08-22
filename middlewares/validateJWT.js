const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const secret = 'segredosupersecreto';

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw boom.unauthorized('Token not found');

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data;
  } catch (err) {
    throw boom.unauthorized('Expired or invalid token');
  }

  next();
};
