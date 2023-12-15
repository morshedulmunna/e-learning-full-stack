import {NextFunction, Request, Response} from "express";
import {createActivationToken} from "../../helpers/generateActivationTokenCode";
import {catchAsyncHandler} from "../../middleware/catchAsyncHandler";
import {iRegistrationBody} from "../../types/user.type";
import ErrorHandler from "../../utils/ErrorHandler";
import sendMail from "../../utils/sendMail";
import userModel from "./user.model";

export const register = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {name, email, password} = req.body;

            //check if the user already exists
            const isEmailExist = await userModel.findOne({email});
            if (isEmailExist)
                next(new ErrorHandler("Email already exists", 409));

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

                res.cookie("verification_token", token);

                res.status(201).json({
                    success: true,
                    message: `Please check your email ${user.email} to activate your account`,
                });
            } catch (err: any) {
                return next(new ErrorHandler(err.message, 400));
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
