import { FAIL } from './../utils/statusText';
import { NextFunction, Request, Response } from "express";

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