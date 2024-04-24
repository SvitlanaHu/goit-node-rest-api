import express from "express";

import {
    signup,
    signin,
    getCurrent,
    signout,
    updateAvatar,
} from "../controllers/userController.js";

import { authorize } from "../middlewares/authorize.js";
import { uploadAvatar } from "../middlewares/uploadAvatar.js";

const authRouter = express.Router();

authRouter.post("/register", signup);

authRouter.post("/login", signin);

authRouter.get("/current", authorize, getCurrent);

authRouter.post("/logout", authorize, signout);

authRouter.patch("/avatars", authorize, uploadAvatar, updateAvatar);

export default authRouter;