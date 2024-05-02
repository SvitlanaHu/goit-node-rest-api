import jwt from "jsonwebtoken";
import "dotenv/config";
import { isValidObjectId } from "mongoose";
import { findUserById } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

export const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return next(HttpError(404, `${id} is not valid id`));
    }
    next();
};

export const authorize = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(HttpError(401));
    }
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        return next(HttpError(401));
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await findUserById(id);
        if (!user || !user.token) {
            return next(HttpError(401));
        }
        req.user = user;
        next();
    } catch (error) {
        next(HttpError(401, error.message));
    }
};