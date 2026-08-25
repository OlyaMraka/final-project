import dotenv from "dotenv";
dotenv.config();

interface IConfig {
    PORT: string;
    MONGO_URL: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACTIVATION_TOKEN_SECRET: string;
    ACTIVATION_LIFETIME: any;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
}

const config: IConfig = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACTIVATION_TOKEN_SECRET: process.env.ACTIVATION_TOKEN_SECRET,
    ACTIVATION_LIFETIME: process.env.ACTIVATION_LIFETIME,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
}

export {
    config,
}