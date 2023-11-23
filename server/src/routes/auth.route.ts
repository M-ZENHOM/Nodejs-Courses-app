import { Request, Router } from 'express'
import { register, login, logout } from "../controllers/auth.controller";
import multer from "multer";
import { verfiyToken } from "../middlewares";
import { DestinationCallback, FileFilterCB, FileNameCallback } from '../types';
const router = Router();

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
    cb(null, "uploads");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});
const fileFilter = function (req: Request, file: Express.Multer.File, cb: FileFilterCB) {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    const error = new Error("Only images are allowed!")
    return cb(error, false);
  }
};
const upload = multer({ storage: storage, fileFilter });

router.route("/logout").get(verfiyToken, logout);
router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);


export default router;