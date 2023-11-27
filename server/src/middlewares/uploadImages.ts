import multer from "multer";
import { DestinationCallback, FileFilterCB, FileNameCallback } from "../types";
import { Request } from "express";


const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
        cb(null, "dist/uploads");
    },
    filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    },
});
const fileFilter = function (req: Request, file: Express.Multer.File, cb: FileFilterCB) {
    const imageType = file.mimetype.split("/")[0];
    if (imageType === "image") {
        return cb(null, true);
    } else {
        const error = new Error("Only images are allowed!")
        return cb(error, false);
    }
};
export const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter });