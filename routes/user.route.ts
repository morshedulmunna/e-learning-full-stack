import express from "express";
import {register} from "../services/user/user.controller";

const userRouter = express.Router();

userRouter.post("/registration", register);

export default userRouter;
