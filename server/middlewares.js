const errorMsg = require("./utils/errorMsg");
const { ERROR, FAIL } = require("./utils/statusText");
const jwt = require("jsonwebtoken");

const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || ERROR,
    code: error.statusCode || 500,
    message: error.message,
    data: null,
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: FAIL,
    message: `Can't find ${req.originalUrl} on this server`,
  });
};

const generateToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

const validator = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).send({
      status: FAIL,
      code: 400,
      data: error.errors,
    });
  }
};

const verfiyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorMsg(401, "Unauthorized", FAIL));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorMsg(403, "invalid token", ERROR));

    req.user = user;
    next();
  });
};

const asyncWrapper = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
};

const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ status: FAIL, message: "You are not allowed" });
    }
    next();
  };
};

module.exports = {
  errorHandler,
  notFoundHandler,
  generateToken,
  validator,
  verfiyToken,
  asyncWrapper,
  allowedTo,
};
