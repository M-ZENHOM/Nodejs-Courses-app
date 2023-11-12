const { FAIL } = require("../utils/statusText");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ status: FAIL, message: "You are not allowed" });
    }
    next();
  };
};
