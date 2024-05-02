import { Schema, model } from "mongoose";

const user = new Schema({
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    avatarURL: String,
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, "Verify token is required"],
    },
},
    { versionKey: false, timestamps: true }
);

const User = model("user", user);

export default User;