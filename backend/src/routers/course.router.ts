import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {courseController} from "../controllers/course.controller";
import {commonMiddleware} from "../middleware/common.middleware";

const router = Router();

router.get(
    '/',
    authMiddleware.checkAccessToken(),
    courseController.GetAllCourses
);

router.post(
    '/',
    authMiddleware.checkAccessToken(),
    courseController.CreateCourse
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    courseController.UpdateCourse
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    courseController.DeleteCourse
);

export const courseRouter = router;
