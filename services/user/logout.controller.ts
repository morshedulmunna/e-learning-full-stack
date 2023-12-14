import {NextFunction, Request, Response} from "express";
import {catchAsyncHandler} from "../../middleware/catchAsyncHandler";
import ErrorHandler from "../../utils/ErrorHandler";

export const logout = catchAsyncHandler(
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

            res.status(200).json({
                success: true,
                message: "logout successfully",
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
