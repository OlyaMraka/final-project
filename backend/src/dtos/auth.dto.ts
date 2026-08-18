export type SignInDto = {
    email: string;
    password: string;
}

export type SetPasswordDto = {
    activationToken: string;
    password: string;
}