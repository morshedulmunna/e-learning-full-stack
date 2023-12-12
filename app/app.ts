import express from "express";
import {ErrorMiddleware} from "../middleware/errors";
import userRouter from "../routes/user.route";
import {notFoundHandler} from "./globalError";
export const app = express();

// middleWare
app.use(require("./globalMiddleware"));

// Router Link
app.use(require("./globalRoutes"));

// Routes
app.use("/api/v1", userRouter);

//Default Global error MiddleWare
app.use(notFoundHandler);
app.use(ErrorMiddleware);
