import express from "express";
import {activateUser, loginUser, logout, register} from "../services";

const userRouter = express.Router();

userRouter.post("/registration", register);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logout);

export default userRouter;
