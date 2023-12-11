// middleware
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const middleware = [
    morgan("dev"),
    cors({
        origin: process.env.ORIGIN,
    }),
    express.json({limit: "50mb"}),
    cookieParser(),
];

module.exports = middleware;
