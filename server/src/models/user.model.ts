import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate: ("Email valdiate", "please enter a valid email!"),
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    avatar: {
      type: String,
      default: "profile.jpg",
    },
    courseList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
    },
  },
  { timestamps: true }
);



export const User = mongoose.model("User", userSchema);
