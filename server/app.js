require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const courseRouter = require("./routes/courses.route");
const authRouter = require("./routes/auth.route");
const usersRouter = require("./routes/users.route");
const express = require("express");
const path = require("path");
const { notFoundHandler, errorHandler } = require("./middlewares");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/dbConnection");
const app = express();
const compression = require("compression");
app.use(compression());

connectDB();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_URL
        : "http://localhost:5173",
  })
);

app.use("/api/courses", courseRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);
app.all("*", notFoundHandler);

module.exports = app;
