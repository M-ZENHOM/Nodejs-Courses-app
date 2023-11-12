const router = require("express").Router();
const {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  getUserCourses,
} = require("../controllers/courses.controller");
const { courseSchema } = require("../schemas/courses.schema");
const verfiyToken = require("../middlewares/verfiyToken");
const allowedTo = require("../middlewares/allowedTo");
const { validator } = require("../middlewares");

router.route("/userCourses/:userId").get(verfiyToken, getUserCourses);
router
  .route("/")
  .get(getAllCourses)
  .post(verfiyToken, validator(courseSchema), addCourse);
router
  .route("/:courseId")
  .get(getCourse)
  .patch(verfiyToken, allowedTo("USER"), updateCourse)
  .delete(verfiyToken, allowedTo("USER"), deleteCourse);

module.exports = router;
