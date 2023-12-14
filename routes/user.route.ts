import express from "express";
import {activateUser} from "../services/user/activate.controller";
import {register} from "../services/user/register.controller";

const userRouter = express.Router();

userRouter.post("/registration", register);
userRouter.post("/activate-user", activateUser);

export default userRouter;
