import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorMsg } from "./utils/errorMsg";
import { ERROR, FAIL } from "./utils/statusText";
import * as z from 'zod';
import { AsyncFunction, ErrorType, UserType } from "./types";


export const errorHandler = (error: ErrorType, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || ERROR,
    code: error.statusCode || 500,
    message: error.message,
    data: null,
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: FAIL,
    message: `Can't find ${req.originalUrl} on this server`,
  });
};

export const generateToken = async (payload: UserType) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return token;
};

export const validator = (schema: z.Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).send({
      status: FAIL,
      code: 400,
      // @ts-ignore
      data: error.errors,
    });
  }
};


export const verfiyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorMsg(401, "Unauthorized", FAIL));

  jwt.verify(token, process.env.JWT_SECRET as string, (err: Error | null, user: any) => {
    if (err) return next(errorMsg(403, "invalid token", ERROR));
    req.user = user;
    next();
  });
};

export const asyncWrapper = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
};


export const allowedTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ status: FAIL, message: "You are not allowed" });
    }
    next();
  };
};

