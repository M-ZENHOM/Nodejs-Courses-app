const { Router } = require("express");
const multer = require("multer");
const { register, login, logout } = require("../controllers/auth.controller");
const verfiyToken = require("../middlewares/verfiyToken");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});
const fileFilter = function (req, file, cb) {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(new Error("Only images are allowed!"), false);
  }
};
const upload = multer({ storage: storage, fileFilter });

router.route("/logout").get(verfiyToken, logout);
router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);

module.exports = router;
