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
