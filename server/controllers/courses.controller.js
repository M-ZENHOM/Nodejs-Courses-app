const Course = require("../models/course.model");
const errorMsg = require("../utils/errorMsg");
const { SUCCESS, FAIL } = require("../utils/statusText");
const User = require("../models/user.model");
const { asyncWrapper } = require("../middlewares");

const getAllCourses = asyncWrapper(async (req, res) => {
  const { limit = 3, page = 1, title, sort = "new" } = req.query;
  const query = {};
  if (title) {
    query.title = { $regex: title, $options: "i" };
  }
  const count = await Course.countDocuments(query);
  const totalPages = Math.ceil(count / limit);
  const courses = await Course.find(query, { __v: false })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: sort === "new" ? -1 : 1 });

  res.json({
    status: SUCCESS,
    data: { pagination: { pages: totalPages, page, count }, courses },
  });
});

const getUserCourses = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.userId).populate(
    "courseList",
    "-__v"
  );

  if (!user.courseList) {
    return next(errorMsg(404, "User doesn't have any courses!", FAIL));
  }
  res.json({ status: SUCCESS, data: { courses: user.courseList } });
});

const getCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    return next(errorMsg(404, "Course not found", FAIL));
  }
  res.json({ status: SUCCESS, data: { course } });
});

const addCourse = asyncWrapper(async (req, res) => {
  const newCourse = new Course({
    title: req.body.title,
    price: req.body.price,
  });
  await newCourse.save();
  await User.findByIdAndUpdate(
    req.body.userOwner,
    { $push: { courseList: newCourse._id } },
    { new: true }
  );
  res.status(201).json({ status: SUCCESS, data: { course: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const course = await Course.updateOne(
    { _id: req.params.courseId },
    {
      $set: { ...req.body },
    }
  );
  res.status(200).json({ status: SUCCESS, data: { course } });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  await Course.deleteOne({ _id: req.params.courseId });
  await User.findByIdAndUpdate(
    req.headers.userid,
    { $pull: { courseList: req.params.courseId } },
    { new: true }
  );
  res.json({ status: SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  getUserCourses,
};
