import HttpError from "../helpers/HttpError.js";

export const updateBody = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(HttpError(400, "missing required field email"));
    }
    next();
};