import express, {Request, Response, NextFunction} from 'express';
import * as mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routers/api.router";
import {ApiError} from "./errors/api.error";
import {userSeeder} from "./seeders/user.seeder";
import {applicationSeeder} from "./seeders/application.seeder";
import {cronsRunner} from "./crons";
import cors from "cors";

const app = express();

const allowedOrigin = config.FRONTEND_URL || 'https://final-project-frontend-two-lyart.vercel.app';

console.log('CORS allowed origin is:', allowedOrigin); // Виведе в логи Azure поточний лінк

app.use(
    cors({
        origin: [allowedOrigin, 'https://final-project-frontend-two-lyart.vercel.app', 'http://localhost:5173'],
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

app.use(
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.statusCode || 500;
        const message = err.message ?? "Something went wrong";
        res.status(status).json({status, message});
    }
)

const dbConnection = async () => {
    try {
        await mongoose.connect(config.MONGO_URL!);
        await userSeeder.seed();
        await applicationSeeder.seed();
    } catch (e) {
        console.error(e);
    }
}

const startServer = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, async () => {
            console.log(`Server started on ${config.PORT}`);
            await cronsRunner();
        })
    } catch (e) {
        console.error(e);
    }
}

startServer();
