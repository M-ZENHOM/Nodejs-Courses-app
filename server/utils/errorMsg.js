const { FAIL } = require("./statusText");

const errorMsg = (statusCode, message, statusText) => {
  const error = new Error();
  error.statusCode = statusCode || 500;
  error.message = message || "Internal Server Error";
  error.statusText = statusText || FAIL;
  return error;
};

module.exports = errorMsg;
