import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import HttpError from "../helpers/HttpError.js";

export const updateBody = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(HttpError(400, "missing required field email"));
    }
    next();
};

//config stor
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join("public", "avatars"));
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];

        cb(null, `${nanoid()}.${extension}`);
    },
});

//filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new HttpError(400, "Please upload only img...."), false);
    }
};

//middleware
export const uploadAvatar = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
}).single("avatar");