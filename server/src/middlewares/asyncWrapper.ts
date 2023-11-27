import { NextFunction, Request, Response } from "express";
import { AsyncFunction } from "../types";

export const asyncWrapper = (fn: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err) => {
            next(err);
        });
    };
};