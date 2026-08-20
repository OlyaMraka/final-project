import {Router} from "express";
import {applicationController} from "../controllers/application.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {commonMiddleware} from "../middleware/common.middleware";
import {ApplicationValidator} from "../validators/application.validator";

const router = Router();

router.get(
    '/',
    commonMiddleware.validateQuery(ApplicationValidator.validateFilters),
    authMiddleware.checkAccessToken(),
    applicationController.getAllLeads
);

router.post(
    '/set-manager/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    applicationController.SetManager
);

export const applicationRouter = router;
