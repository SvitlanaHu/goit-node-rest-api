import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import gravatar from "gravatar";
import Jimp from "jimp";
import path from "path";
import { promises as fs } from "fs";
import { nanoid } from "nanoid";

import * as userServices from "../services/userServices.js";

import HttpError from "../helpers/HttpError.js";
import { sendEmail } from "../helpers/sendEmail.js";

const { JWT_SECRET, BASE_URL } = process.env;

const options = {
    default: "404",
};

export const signup = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userServices.findUser({ email });

        if (user) {
            throw HttpError(409, "Email already in use");
        }
        const verificationToken = nanoid();

        const avatarURL = gravatar.url(email, options);
        const newUser = await userServices.signup(
            req.body,
            avatarURL,
            verificationToken
        );

        //
        const msg = {
            to: email,
            from: myEMAIL,
            subject: "Verify email",
            html: `<a target="_blank"  href='${BASE_URL}/api/users/verify/${verificationToken}'>CLick to verify email </a>`,
        };

        await sendEmail(msg);

        res.status(201).json({
            email: newUser.email,
            subscription: newUser.subscription,
        });
    } catch (error) {
        next(error);
    }
};

export const verify = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await userServices.findUser({ verificationToken });

        if (!user) {
            throw HttpError(404, "User not found");
        }

        await userServices.updateVerify(user._id);

        res.json({
            message: "Verification successful",
        });
    } catch (error) {
        next(error);
    }
};

export const resendVerify = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userServices.findUser({ email });
        if (!user) {
            throw HttpError(404, "User not found");
        }

        if (user.verify) {
            throw HttpError(400, "Verification has already been passed");
        }
        const { verificationToken } = user;

        const msg = {
            to: email,
            from: myEMAIL,
            subject: "Verify email",
            html: `<a target="_blank"  href='${BASE_URL}/api/users/verify/${verificationToken}'>CLick to verify email </a>`,
        };
        await sendEmail(msg);
        res.json({
            message: "Verification email sent",
        });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userServices.findUser({ email });
        if (!user) {
            throw HttpError(401, "Email or password invalid");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw HttpError(401, "Email or password invalid");
        }

        if (!user.verify) {
            throw HttpError(
                403,
                "Your account is not verified. Please check your email for verification."
            );
        }

        const payload = {
            id: user._id,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
        await userServices.setToken(user._id, token);

        res.json({
            token,
            user: { email: user.email, subscription: user.subscription },
        });
    } catch (error) {
        next(error);
    }
};

export const getCurrent = async (req, res, next) => {
    try {
        const { email, subscription, avatarURL } = req.user;

        res.json({
            email,
            subscription,
        });
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await userServices.setToken(_id);

        res.json({
            message: "Signout success",
        });
    } catch (error) {
        next(error);
    }
};

export const updateAvatar = async (req, res, next) => {
    try {
        const dir = path.resolve("public", "avatars");
        const { _id } = req.user;
        const { path: filePath, filename } = req.file;

        //Отримання і вдалення старої аватарки
        const currentUser = await userServices.findUserById(_id);
        const oldAvatarPath = path.resolve(
            "public",
            currentUser.avatarURL.slice(1)
        );
        try {
            await fs.unlink(oldAvatarPath);
        } catch (error) {
            console.error(error.message);
        }
        //

        Jimp.read(filePath, (err, lenna) => {
            if (err) throw err;
            lenna.resize(250, 250).write(`${dir}/${filename}`);
        });
        const avatarURL = `/avatars/${filename}`;

        await userServices.updateAvatar(_id, avatarURL);
        res.json({ avatarURL });
    } catch (error) {
        next(error);
    }
};