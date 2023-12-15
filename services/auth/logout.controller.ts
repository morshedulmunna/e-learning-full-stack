import {NextFunction, Request, Response} from "express";
import {redis} from "../../config/redis.config";
import {catchAsyncHandler} from "../../middleware/catchAsyncHandler";
import ErrorHandler from "../../utils/ErrorHandler";

export const logout = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            redis.del(req.user?._id);

            res.status(200).json({
                success: true,
                message: "logout successfully",
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
