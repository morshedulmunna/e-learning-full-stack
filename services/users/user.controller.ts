import {NextFunction, Request, Response} from "express";
import {iUpdateUser} from "../../types/users.types";
import ErrorHandler from "../../utils/ErrorHandler";
import {catchAsyncHandler} from "./../../middleware/catchAsyncHandler";
import {userInfo} from "./get.user.info.service";
import {updateUser} from "./update.userInfo.service";

// get user info
export const getUserInfo = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userInfo(req.user?._id, res);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 404));
        }
    }
);

// Update user information
export const updateUserInfo = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body as iUpdateUser;
            const userId = req.user?._id;

            const user_info = await updateUser(user, userId);
            res.status(200).json({
                success: true,
                message: "User info updated",
                data: user_info,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
