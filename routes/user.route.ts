import express from "express";
import {isAuthenticated} from "../middleware/authentication";
import {socialAuth} from "../services/auth/social.auth.service";
import {getUserInfo, updateUserInfo} from "../services/users/user.controller";
const userRouter = express.Router();

userRouter.get("/user-info", isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

export default userRouter;
