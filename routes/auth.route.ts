import express from "express";
import {isAuthenticated} from "../middleware/authentication";
import {activateUser, loginUser, logout, register} from "../services";
import {updateAccessToken} from "../services/auth/refresh.controller";

const userRouter = express.Router();

userRouter.post("/registration", register);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logout);
userRouter.get("/refresh-token", updateAccessToken);

export default userRouter;
