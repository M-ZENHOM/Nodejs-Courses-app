const {
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const verfiyToken = require("../middlewares/verfiyToken");

const router = require("express").Router();

router.route("/:userId").get(getUserInfo).put(updateUser).delete(deleteUser);

module.exports = router;
