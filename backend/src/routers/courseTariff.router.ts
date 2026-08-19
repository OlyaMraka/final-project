import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {courseTariffController} from "../controllers/courseTariff.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {CourseTariffValidator} from "../validators/courseTariff.validator";

const router = Router();

router.get(
    '/',
    authMiddleware.checkAccessToken(),
    courseTariffController.GetAllCourseTariffs
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    courseTariffController.GetCourseTariffById
);

router.post(
    '/',
    commonMiddleware.validateBody(CourseTariffValidator.validateCourseTariff),
    authMiddleware.checkAccessToken(),
    courseTariffController.CreateCourseTariff
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(CourseTariffValidator.validateCourseTariff),
    authMiddleware.checkAccessToken(),
    courseTariffController.UpdateCourseTariffById
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    courseTariffController.DeleteCourseTariffById
);

export const courseTariffRouter = router;
