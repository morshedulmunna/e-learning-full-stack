import {Document} from "mongoose";

export interface iUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        ur: string;
    };
    role: string;
    isVerified: boolean;
    courses: Array<{courseId: string}>;
    comparePassword: (password: string) => Promise<boolean>;
}

export interface iRegistrationBody {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface iActivationToken {
    token: string;
    activationCode: string;
}

export interface iActivationRequest {
    activation_token: string;
    activation_code: string;
}
