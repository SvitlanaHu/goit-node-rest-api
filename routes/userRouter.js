import express from "express";

import {
    signup,
    signin,
    getCurrent,
    signout,
    updateAvatar,
    verify,
    resendVerify,
} from "../controllers/userController.js";

import { authorize } from "../middlewares/authorizeAndValidId.js";
import { updateBody, uploadAvatar } from "../middlewares/updateBody.js";

const userRouter = express.Router();

userRouter.post("/register", signup);

userRouter.post("/login", signin);

userRouter.get("/current", authorize, getCurrent);

userRouter.post("/logout", authorize, signout);

userRouter.get("/verify/:verificationToken", verify);

userRouter.get("/verify", updateBody, resendVerify);

userRouter.patch("/avatars", authorize, uploadAvatar, updateAvatar);

export default userRouter;