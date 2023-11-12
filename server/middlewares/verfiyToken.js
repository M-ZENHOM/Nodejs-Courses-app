const jwt = require("jsonwebtoken");
const { FAIL, ERROR } = require("../utils/statusText");
const errorMsg = require("../utils/errorMsg");

const verfiyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorMsg(401, "Unauthorized", FAIL));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorMsg(403, "invalid token", ERROR));

    req.user = user;
    next();
  });
};

module.exports = verfiyToken;
