import {NextFunction, Request, Response} from "express";
import {catchAsyncHandler} from "../../middleware/catchAsyncHandler";
import ErrorHandler from "../../utils/ErrorHandler";
import {userInfo} from "./get.user.info.service";

export const getUserInfo = catchAsyncHandler(
    (req: Request, res: Response, next: NextFunction) => {
        try {
            userInfo(req.user?._id, res);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 404));
        }
    }
);
