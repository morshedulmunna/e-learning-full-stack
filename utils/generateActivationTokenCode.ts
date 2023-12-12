import jwt, {Secret} from "jsonwebtoken";
import {iActivationToken, iRegistrationBody} from "../services/user/type";

export const createActivationToken = (
    user: iRegistrationBody
): iActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign(
        {
            user,
            activationCode,
        },
        process.env.JWT_SECRET as Secret,
        {
            expiresIn: "5m",
        }
    );
    return {token, activationCode};
};
