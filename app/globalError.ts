import {NextFunction, Request, Response} from "express";

export const notFoundHandler = (
    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    const error: any = new Error("Resource Not Found");
    error.status = 404;
    next(error);
};
