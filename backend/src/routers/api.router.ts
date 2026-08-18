import {Router} from "express";
import {userRouter} from "./user.router";
import {authRouter} from "./auth.router";
import {courseRouter} from "./course.router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/courses", courseRouter);

export const apiRouter = router;
