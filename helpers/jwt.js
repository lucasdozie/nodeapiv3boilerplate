const jwt = require('jsonwebtoken');

const { PRIVATE_JWT_SECRET } = process.env;

exports.sign = payload => jwt.sign(payload, PRIVATE_JWT_SECRET, { expiresIn: '3h' });

exports.verify = token => jwt.verify(token, PRIVATE_JWT_SECRET);