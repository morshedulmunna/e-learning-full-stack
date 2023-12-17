import express from "express";
import {isAuthenticated} from "../middleware/authentication";
import {activateUser, loginUser, logout, register} from "../services";
import {updateAccessToken} from "../services/auth/refresh.controller";

const authRouter = express.Router();

authRouter.post("/registration", register);
authRouter.post("/activate-user", activateUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", isAuthenticated, logout);
authRouter.get("/refresh-token", updateAccessToken);

export default authRouter;
