import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {redis} from "../config/redis.config";
import ErrorHandler from "../utils/ErrorHandler";
import {catchAsyncHandler} from "./catchAsyncHandler";

export const isAuthenticated = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const access_token = req.cookies.access_token as string;
        if (!access_token) next(new ErrorHandler("access denied!", 403));

        const decoded = jwt.verify(
            access_token,
            process.env.ACCESS_TOKEN as string
        ) as JwtPayload;
        if (!decoded) next(new ErrorHandler("access denied", 403));

        const user = await redis.get(decoded.id);
        if (!user) next(new ErrorHandler("access denied", 403));

        req.user = JSON.parse(user || "");

        next();
    }
);
