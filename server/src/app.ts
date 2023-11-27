require("dotenv").config();
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import courseRouter from "./routes/courses.route";
import authRouter from "./routes/auth.route";
import usersRouter from "./routes/users.route";
import compression from "compression";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

export const app: Express = express();


// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/uploads", express.static(path.join(__dirname, "../dist/uploads")));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(compression());
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


