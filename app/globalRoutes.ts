import {Request, Response} from "express";

const router = require("express").Router();

router.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        message: "Server Running Successfully!",
    });
});

router.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({message: "Success"});
});

module.exports = router;
