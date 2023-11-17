const User = require("../models/user.model");
const { SUCCESS, FAIL } = require("../utils/statusText");
const bcrypt = require("bcrypt");
const { generateToken, asyncWrapper } = require("../middlewares");
const errorMsg = require("../utils/errorMsg");

const register = asyncWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return next(errorMsg(400, "User already exists", FAIL));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashPassword,
    role,
    // avatar: req.file.filename,
  });
  await newUser.save();
  res
    .status(201)
    .json({ status: SUCCESS, data: { user: "User created successfully" } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!email && !password)
    return next(errorMsg(400, "Please provide email and password", FAIL));
  if (!user) return next(errorMsg(404, "User not found", FAIL));
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) return next(errorMsg(400, "Invalid password", FAIL));
  const token = await generateToken({
    email: user.email,
    id: user._id,
    role: user.role,
  });
  const { password: pass, ...rest } = user._doc;
  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "None", // Prevent CSRF attacks  -  Was strict
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    .status(200)
    .json({ status: SUCCESS, data: { user: rest } });
});

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res
      .status(200)
      .json({ status: SUCCESS, data: { user: "User has been logged out!" } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
};
