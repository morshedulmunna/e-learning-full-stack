import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    err.statusCOde = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongodb id error handling
    if (err.name === "CastError") {
        const message = "Resource Not Found: " + err.message;
        err = new ErrorHandler(message, 400);
    }

    //Duplicate key error handling
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error handling
    if (err.name === "jwtWebTokenError") {
        const message = `Json web token is invalid, try again!`;
        err = new ErrorHandler(message, 400);
    }

    //Jwt Expired error handling
    if (err.name === "TokenExpireError") {
        const message = "Json web token is expired, try again";
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
