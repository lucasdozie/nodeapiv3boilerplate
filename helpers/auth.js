const { get } = require('./redis');
const { verify } = require('./jwt');

const useBearerToken = async (req, res, next) => {
    const tok = req.get('Authorization');
      console.log("==== tok ==",tok)
      if (!tok) {
        req.user = undefined;
        next();
        // return res.status(401).json({
        //   status: 401,
        //   message: 'No token provided, must be set on the Authorization Header',
        // });
        return;
      }

      const token = tok.split(' ')[1];

      try {
        const isAuthorized = await verify(token);
        //console.log("==== isAuthorized ==",isAuthorized)
        if (isAuthorized) {
          req.user = isAuthorized;
          next();
        }
      } catch (err) {
        res.status(401).json({
          status: 401,
          message: 'Invalid user token.',
        });
      }
};

const useHeaderAccessToken = async (req, res, next) => {
    if (
      req.headers &&
      req.headers.access_token &&
      req.headers.access_token.split(" ")[0] === "JWT"
    ) {
      const user = jwt.verify(
        req.headers.access_token.split(" ")[1],
        process.env.PRIVATE_JWT_SECRET
      );
       console.log("user:.", user);
      if (user) {
        req.user = user;
        next();
      } else {
        req.user = undefined;
        next();
      }
    } else {
      req.user = undefined;
      next();
    }
};

const useIsAdmin = async (req, res, next) => {
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
  useBearerToken,
  useHeaderAccessToken,
  useIsAdmin,
};