import express from "express";
import {ErrorMiddleware} from "../middleware/errors";
import {notFoundHandler} from "./globalError";
export const app = express();

// middleWare
app.use(require("./globalMiddleware"));

// Router Link
app.use(require("./globalRoutes"));

//Default Global error MiddleWare
app.use(notFoundHandler);
app.use(ErrorMiddleware);
