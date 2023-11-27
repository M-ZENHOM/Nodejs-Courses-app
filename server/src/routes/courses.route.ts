import { Router } from 'express'
import { addCourse, deleteCourse, getAllCourses, getCourse, getUserCourses, updateCourse } from "../controllers/courses.controller";
import { courseSchema } from '../schemas/courses.schema';
import { verfiyToken } from '../middlewares/tokenHandlers';
import { validator } from '../middlewares/validator';
import { allowedTo } from '../middlewares/roleGurad';

const router = Router();

router.route("/userCourses/:userId").get(verfiyToken, getUserCourses);
router.route("/").get(getAllCourses).post(verfiyToken, validator(courseSchema), addCourse);
router.route("/:courseId").get(getCourse).patch(verfiyToken, allowedTo("USER"), updateCourse)
  .delete(verfiyToken, allowedTo("USER"), deleteCourse);


export default router;