import { z } from "zod";
import { FAIL } from "../utils/statusText";
import { NextFunction, Request, Response } from "express";

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

