import {redis} from "../../config/redis.config";
import {iUpdateUser} from "../../types/users.types";
import userModel from "../auth/user.model";

export const updateUser = async (user: iUpdateUser, userId: string) => {
    try {
        const {name, email} = user;

        // checking user already exists
        const existUser = await userModel.findById(userId);

        // check email exists and email is valid and update
        if (email && existUser) {
            const isEmailExist = await userModel.findOne({email});
            if (isEmailExist) throw new Error(`User ${userId} already exists`);
            existUser.email = email;
        }
        // checking if user already exists and name need to be updated
        if (name && existUser) existUser.name = name;

        // Save updated user information
        await existUser?.save();
        // set current user to redis instance
        await redis.set(userId, JSON.stringify(existUser));

        return existUser;
    } catch (error: any) {
        throw new Error(error);
    }
};
