import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (data, avatarURL, verificationToken) => {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    return User.create({
        ...data,
        password: hashPassword,
        avatarURL,
        verificationToken,
    });
};

export const setToken = (id, token = "") =>
    User.findByIdAndUpdate(id, { token }, { new: true });

export const findUser = (filter) => User.findOne(filter);

export const findUserById = (id) => User.findById(id);

export const updateAvatar = (id, avatarURL) => {
    return User.findByIdAndUpdate(id, { avatarURL });
};

export const updateVerify = (id) => User.findByIdAndUpdate(id, { verify: true, verificationToken: null });