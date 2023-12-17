import {NextFunction, Request, Response} from "express";
import {catchAsyncHandler} from "../../middleware/catchAsyncHandler";
import {iSocialAuthBody} from "../../types/auth.type";
import ErrorHandler from "../../utils/ErrorHandler";
import {sendToken} from "../../utils/jwt";
import userModel from "./user.model";

export const socialAuth = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, name, avatar} = req.body as iSocialAuthBody;

            const user = await userModel.findOne({email});

            if (!user) {
                const newUser = await userModel.create({
                    email,
                    name,
                    avatar,
                });
                sendToken(newUser, 200, res);
            } else {
                sendToken(user, 200, res);
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
