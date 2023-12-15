import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, {Model, Schema} from "mongoose";
import {iUser} from "../../types/user.type";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// User Schema
const userSchema: Schema<iUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name."],
        },
        email: {
            type: String,
            required: [true, "Please enter your email."],
            validate: {
                validator: (value: string) => emailRegexPattern.test(value),
                message: "Please enter a valid email!",
            },
        },

        password: {
            type: String,
            required: [true, "Please enter your password."],
            minlength: [6, "Please enter at least 6 characters."],
            select: false,
        },
        avatar: {
            public_id: String,
            url: String,
        },

        role: {
            type: String,
            default: "user",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },

        courses: [
            {
                courseId: String,
            },
        ],
    },
    {timestamps: true}
);

//Hashing Password
userSchema.pre<iUser>("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare  password
userSchema.methods.comparePassword = async function (
    enterPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enterPassword, this.password);
};

userSchema.methods.signAccessToken = function () {
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN_SECRET || "");
};

userSchema.methods.signRefreshToken = function () {
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET || "");
};

const userModel: Model<iUser> = mongoose.model("User", userSchema);
export default userModel;
