const router = require("express").Router();
const {
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

router.route("/:userId").get(getUserInfo).put(updateUser).delete(deleteUser);

module.exports = router;
