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

module.exports = {
  errorHandler,
  notFoundHandler,
  generateToken,
  validator,
};
