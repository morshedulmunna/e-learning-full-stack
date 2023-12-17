import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload, Secret} from "jsonwebtoken";
import {redis} from "../../config/redis.config";
import {catchAsyncHandler} from "../../middleware/catchAsyncHandler";
import ErrorHandler from "../../utils/ErrorHandler";
import {accessTokenOptions, refreshTokenOptions} from "../../utils/jwt";

// After invalidating the access token generate new access tokens using refresh token
export const updateAccessToken = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refresh_token = req.cookies.refresh_token as string;
            const decoded = jwt.verify(
                refresh_token,
                process.env.REFRESH_TOKEN_SECRET as Secret
            ) as JwtPayload;
            if (!decoded) next(new ErrorHandler("Invalid refresh token", 403));

            const session = await redis.get(decoded.id as string);
            if (!session) next(new ErrorHandler("session expired!", 403));

            const user = JSON.parse(session || "");

            const accessToken = jwt.sign(
                {id: user._id},
                process.env.ACCESS_TOKEN_SECRET as Secret,
                {
                    expiresIn: "5m",
                }
            );
            const refreshToken = jwt.sign(
                {id: user._id},
                process.env.REFRESH_TOKEN_SECRET as Secret,
                {
                    expiresIn: "3d",
                }
            );

            req.user = user;

            res.cookie("access_token", accessToken, accessTokenOptions);
            res.cookie("refresh_token", refreshToken, refreshTokenOptions);

            res.status(200).json({
                success: true,
                accessToken,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
