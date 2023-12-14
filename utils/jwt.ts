import {Response} from "express";
import {redis} from "../config/redis.config";
import {iTokenOption} from "../types/jwt.type";
import {iUser} from "../types/user.type";

export const sendToken = (user: iUser, statusCode: number, res: Response) => {
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();

    // Upload the session to redis database for using caching
    redis.set(user._id, JSON.stringify(user));

    // Parse environment variables to integer with fallback values
    const accessTokenExpire = parseInt(
        process.env.ACCESS_TOKEN_EXPIRE || "300",
        10
    );
    const refreshTokenExpire = parseInt(
        process.env.REFRESH_TOKEN_EXPIRE || "1200",
        10
    );

    // Option for cookies
    const accessTokenOptions: iTokenOption = {
        expires: new Date(Date.now() + accessTokenExpire * 1000),
        maxAge: refreshTokenExpire * 1000,
        httpOnly: true,
        sameSite: "lax",
    };
    const refreshTokenOptions: iTokenOption = {
        expires: new Date(Date.now() + refreshTokenExpire * 1000),
        maxAge: refreshTokenExpire * 1000,
        httpOnly: true,
        sameSite: "lax",
    };

    if (process.env.NODE_ENV === "production") {
        accessTokenOptions.secure = true;
    }

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    return accessToken;
};
