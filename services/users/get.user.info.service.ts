import {Response} from "express";
import userModel from "../auth/user.model";

export const userInfo = async (id: string, res: Response) => {
    const user = await userModel.findById(id);

    res.status(200).json({
        success: true,
        user,
    });
};
