import {NextFunction, Request, Response} from "express";
import {catchAsyncHandler} from "../../middleware/catchAsyncHandler";
import ErrorHandler from "../../utils/ErrorHandler";
import {createActivationToken} from "../../utils/generateActivationTokenCode";
import sendMail from "../../utils/sendMail";
import {iRegistrationBody} from "./type";
import userModel from "./user.model";

export const register = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {name, email, password} = req.body;

            //check if the user already exists
            const isEmailExist = await userModel.findOne({email});
            if (isEmailExist)
                next(new ErrorHandler("Email already exists", 400));

            const user: iRegistrationBody = {
                name,
                email,
                password,
            };
            const {token, activationCode} = createActivationToken(user);
            const data = {user: {name: user.name}, activationCode};

            try {
                await sendMail({
                    email: user.email,
                    subject: "Activation Your Account",
                    template: "activation-mail.ejs",
                    data,
                });

                res.status(201).json({
                    success: true,
                    message: `Please check your email ${user.email} to activate your account`,
                    activationToken: token,
                });
            } catch (err: any) {
                return next(new ErrorHandler(err.message, 400));
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
