import { Router } from 'express'
import { addCourse, deleteCourse, getAllCourses, getCourse, getUserCourses, updateCourse } from "../controllers/courses.controller";
import { allowedTo, validator, verfiyToken } from "../middlewares";
import { courseSchema } from '../schemas/courses.schema';

const router = Router();

router.route("/userCourses/:userId").get(verfiyToken, getUserCourses);
router.route("/").get(getAllCourses).post(verfiyToken, validator(courseSchema), addCourse);
router.route("/:courseId").get(getCourse).patch(verfiyToken, allowedTo("USER"), updateCourse)
  .delete(verfiyToken, allowedTo("USER"), deleteCourse);


export default router;