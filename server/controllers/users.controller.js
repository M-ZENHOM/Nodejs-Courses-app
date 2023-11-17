const { asyncWrapper } = require("../middlewares");
const User = require("../models/user.model");
const errorMsg = require("../utils/errorMsg");
const { SUCCESS, FAIL } = require("../utils/statusText");

const getUserInfo = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.userId, {
    __v: false,
    password: false,
  });
  if (!user) {
    return next(errorMsg(404, "User not found", FAIL));
  }
  res.json({ status: SUCCESS, data: { user } });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  });
  if (!user) {
    return next(errorMsg(404, "User not found", FAIL));
  }
  const { password, ...rest } = user._doc;
  res.json({ status: SUCCESS, data: { user: rest } });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) {
    return next(errorMsg(404, "User not found", FAIL));
  }
  res.clearCookie("access_token");
  res.json({ status: SUCCESS, data: null });
});

module.exports = {
  getUserInfo,
  updateUser,
  deleteUser,
};
