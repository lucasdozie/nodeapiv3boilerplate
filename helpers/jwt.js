const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.sign = payload => jwt.sign(payload, JWT_SECRET, { expiresIn: '3h' });

exports.verify = token => jwt.verify(token, JWT_SECRET);