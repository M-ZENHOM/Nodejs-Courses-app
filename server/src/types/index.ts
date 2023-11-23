import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";

export interface ErrorType {
    statusCode: number;
    statusText: string;
    message: string;
}

export interface UserType {
    email: string,
    id: ObjectId | string,
    role: string
}

export type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

export type searchQuerys = {
    title?: {
        $regex: string;
        $options: string;
    };
}
// multer types
export type DestinationCallback = (error: Error | null, destination: string) => void
export type FileNameCallback = (error: Error | null, filename: string) => void
export type FileFilterCB = {
    (error: Error | null): void;
    (error: Error | null, acceptFile: boolean): void;
}