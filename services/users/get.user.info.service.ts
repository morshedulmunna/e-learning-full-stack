import {Response} from "express";
import {redis} from "../../config/redis.config";

export const userInfo = async (id: string, res: Response) => {
    const user = await redis.get(id);

    if (user) {
        const userInfo = JSON.parse(user);
        delete userInfo.password;
        res.status(200).json({
            success: true,
            data: userInfo,
        });
    }
};
