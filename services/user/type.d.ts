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
