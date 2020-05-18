const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.sign = pkg => jwt.sign(pkg, JWT_SECRET, { expiresIn: '3h' });

exports.verify = token => jwt.verify(token, JWT_SECRET);