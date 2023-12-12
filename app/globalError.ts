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

// export const errorHandler = (
//     error: any,
//     _req: Request,
//     res: Response,
//     _next: NextFunction
// ) => {
//     if (error.status) {
//         return res.status(error.status).json({
//             message: error.message,
//         });
//     }
//     res.status(500).json({message: "Something went Wrong"});
// };
