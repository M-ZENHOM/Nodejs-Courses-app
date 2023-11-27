import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../types";
import { ERROR, FAIL } from "../utils/statusText";

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