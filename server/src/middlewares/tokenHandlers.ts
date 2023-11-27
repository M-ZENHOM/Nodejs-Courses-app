import jwt from "jsonwebtoken";
import { UserType } from "../types";
import { NextFunction, Request, Response } from "express";
import { ERROR, FAIL } from "../utils/statusText";
import { errorMsg } from "../utils/errorMsg";

export const generateToken = async (payload: UserType) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "30d",
    });
    return token;
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