import {Router} from "express";
import {userRouter} from "./user.router";
import {authRouter} from "./auth.router";
import {courseRouter} from "./course.router";
import {tariffRouter} from "./tariff.router";
import {courseTariffRouter} from "./courseTariff.router";
import {groupRouter} from "./group.router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/courses", courseRouter);
router.use("/tariffs", tariffRouter);
router.use("/courseTariffs", courseTariffRouter);
router.use("/groups", groupRouter);

export const apiRouter = router;
