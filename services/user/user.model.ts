import bcrypt from "bcryptjs";
import mongoose, {Document, Model, Schema} from "mongoose";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// user interface
export interface iUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        ur: string;
    };
    role: string;
    isVerified: boolean;
    courses: Array<{courseId: string}>;
    comparePassword: (password: string) => Promise<boolean>;
}

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
userSchema.methods.comparePassword = async function (enterPassword: string) {
    return await this.password.compare(enterPassword, this.password);
};

const userModel: Model<iUser> = mongoose.model("User", userSchema);
export default userModel;
