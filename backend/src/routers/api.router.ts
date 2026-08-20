import {Router} from "express";
import {userRouter} from "./user.router";
import {authRouter} from "./auth.router";
import {groupRouter} from "./group.router";
import {applicationRouter} from "./application.router";
import {commentRouter} from "./application-comment.router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/groups", groupRouter);
router.use("/applications", applicationRouter);
router.use("/application-comments", commentRouter)

export const apiRouter = router;
