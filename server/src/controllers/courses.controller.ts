import { NextFunction, Request, Response } from "express";
import { Course } from "../models/course.model";
import { User } from "../models/user.model";
import { errorMsg } from "../utils/errorMsg";
import { FAIL, SUCCESS } from "../utils/statusText";
import { searchQuerys } from "../types";
import { asyncWrapper } from "../middlewares/asyncWrapper";


export const getAllCourses = asyncWrapper(async (req: Request, res: Response) => {
  const { limit = 3, page = 1, title, sort = "new" } = req.query;
  const query: searchQuerys = {};
  if (title) {
    query.title = { $regex: title as string, $options: "i" };
  }
  const count = await Course.countDocuments(query);
  const totalPages = Math.ceil(count / Number(limit));
  const courses = await Course.find(query, { __v: false })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .sort({ createdAt: sort === "new" ? -1 : 1 });

  res.json({
    status: SUCCESS,
    data: { pagination: { pages: totalPages, page, count }, courses },
  });
});

export const getUserCourses = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.userId).populate(
    "courseList",
    "-__v"
  );

  if (!user?.courseList) {
    return next(errorMsg(404, "User doesn't have any courses!", FAIL));
  }
  res.json({ status: SUCCESS, data: { courses: user.courseList } });
});

export const getCourse = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    return next(errorMsg(404, "Course not found", FAIL));
  }
  res.json({ status: SUCCESS, data: { course } });
});

export const addCourse = asyncWrapper(async (req: Request, res: Response) => {
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

export const updateCourse = asyncWrapper(async (req: Request, res: Response) => {
  const course = await Course.updateOne(
    { _id: req.params.courseId },
    {
      $set: { ...req.body },
    }
  );
  res.status(200).json({ status: SUCCESS, data: { course } });
});

export const deleteCourse = asyncWrapper(async (req: Request, res: Response) => {
  await Course.deleteOne({ _id: req.params.courseId });
  await User.findByIdAndUpdate(
    req.headers.userid,
    { $pull: { courseList: req.params.courseId } },
    { new: true }
  );
  res.json({ status: SUCCESS, data: null });
});

