import express from "express";

import {
    signup,
    signin,
    getCurrent,
    signout,
} from "../controllers/userController.js";

import { authorize } from "../middlewares/authorize.js";

const authRouter = express.Router();

authRouter.post("/register", signup);

authRouter.post("/login", signin);

authRouter.get("/current", authorize, getCurrent);

authRouter.post("/logout", authorize, signout);

export default authRouter;