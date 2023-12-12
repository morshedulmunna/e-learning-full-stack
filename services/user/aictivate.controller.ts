import {NextFunction, Request, Response} from "express";
import {catchAsyncHandler} from "../../middleware/catchAsyncHandler";
import {iActivationRequest} from "./type";

export const activateUser = catchAsyncHandler(
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const {activation_code, activation_token} =
                req.body as iActivationRequest;

            // const decoder =
        } catch (error) {}
    }
);

//TODO -> work here
