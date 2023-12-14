import express from "express";
import {activateUser} from "../services/user/activate.controller";
import {loginUser} from "../services/user/login.controller";
import {register} from "../services/user/register.controller";

const userRouter = express.Router();

userRouter.post("/registration", register);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);

export default userRouter;
