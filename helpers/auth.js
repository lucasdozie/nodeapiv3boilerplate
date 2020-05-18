const { get } = require('./redis');
const { verify } = require('./jwtHelpers');

const checkToken = async (req, res, next) => {
  const tok = req.get('Authorization');

  if (!tok) {
    return res.status(401).json({
      status: 401,
      message: 'No token provided, must be set on the Authorization Header',
    });
  }

  const token = tok.split(' ')[1];

  try {
    const isAuthorized = await verify(token);

    const { id } = isAuthorized;

    if (isAuthorized) {
      next();
    }
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: 'Invalid user token.',
    });
  }
};

const checkIsAdmin = async (req, res, next) => {
  const tok = req.get('Authorization');

  if (!tok) {
    return res.status(401).json({
      status: 401,
      message: 'No token provided, must be set on the Authorization Header',
    });
  }

  const token = tok.split(' ')[1];

  try {
    const isAuthorized = await verify(token);

    const { id, isAdmin } = isAuthorized;

    if (id && isAdmin) {
      next();
    } else {
      return res.status(403).json({
        status: 403,
        message: 'Only admins can use this feature.',
      });
    }
    // }
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: 'Invalid user token.',
    });
  }
};

module.exports = {
  checkToken,
  checkIsAdmin,
};