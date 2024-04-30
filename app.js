import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/userRouter.js"

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", userRouter)
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

const { MONGODB_URL, PORT = 4005 } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Database connection successful`);
        });
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });