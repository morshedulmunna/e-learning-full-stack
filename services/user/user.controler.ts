import {NextFunction, Request, Response} from "express";
import {CatchAsyncError} from "../../middleware/catchAsyncErrors";
import ErrorHandler from "../../utils/ErrorHandler";
import {emailValidationCodeSent} from "../../utils/emailValidationCodeSent";
import {createActivationToken} from "../../utils/generateActivationTokenCode";
import {iRegistrationBody} from "./type";
import userModel from "./user.model";

export const register = CatchAsyncError(
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
            const html = await emailValidationCodeSent(data);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
