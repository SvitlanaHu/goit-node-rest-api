import Joi from "joi";
import { emailRegexp } from "../constants/regexp";

export const signupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required,
});

export const signinSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required,
});

export const verifySchema = Joi.object({
    email: Joi.string().email().required(),
});