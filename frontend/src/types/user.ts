export type User = {
    _id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    banned: boolean;
    deleted: boolean;
    isActive: boolean;
}

export type Token = {
    access_token: string;
    refresh_token: string;
}

export type LogInResponse = {
    user: User;
    token: Token;
}
