import { NextFunction, Request, Response } from "express";
import { FAIL, SUCCESS } from "../utils/statusText";
import { errorMsg } from "../utils/errorMsg";
import { User } from "../models/user.model";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import cloudinary, { CloudinaryUploadResponse } from "../utils/cloudinary";


export const getUserInfo = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.userId, {
    __v: false,
    password: false,
  });
  if (!user) {
    return next(errorMsg(404, "User not found", FAIL));
  }
  res.json({ status: SUCCESS, data: { user } });
});

export const updateUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {

  const profileAvatar = await cloudinary.uploader
    .upload(req.file?.path!)
    .then((result: CloudinaryUploadResponse) => result.secure_url)

  const user = await User.findByIdAndUpdate(req.params.userId, {
    name: req.body.name,
    email: req.body.email,
    avatar: profileAvatar,
  }, { new: true });

  if (!user) {
    return next(errorMsg(404, "User not found", FAIL));
  }

  const { password, ...rest } = user.toObject();
  res.json({ status: SUCCESS, data: { user: rest } });
});

export const deleteUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) {
    return next(errorMsg(404, "User not found", FAIL));
  }
  res.clearCookie("access_token");
  res.json({ status: SUCCESS, data: null });
});

