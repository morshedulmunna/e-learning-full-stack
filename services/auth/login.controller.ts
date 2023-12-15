import {NextFunction, Request, Response} from "express";
import {catchAsyncHandler} from "../../middleware/catchAsyncHandler";
import {iUser} from "../../types/user.type";
import ErrorHandler from "../../utils/ErrorHandler";
import {sendToken} from "../../utils/jwt";
import userModel from "./user.model";

export const loginUser = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, password} = req.body;

            if (!email || !password)
                next(new ErrorHandler("Please enter email and password", 400));

            const user = await userModel
                .findOne({email: email})
                .select("+password");
            if (!user) next(new ErrorHandler("Invalid email or password", 400));

            const isPasswordMatch = await user?.comparePassword(password);

            if (!isPasswordMatch)
                next(new ErrorHandler("Invalid email or password", 400));

            const token = sendToken(user as iUser, 200, res);

            res.status(200).json({
                success: true,
                user,
                access_token: token,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
