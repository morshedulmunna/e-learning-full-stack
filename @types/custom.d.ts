import {iUser} from "../types/auth.type";
declare global {
    namespace Express {
        interface Request {
            user?: iUser;
        }
    }
}
