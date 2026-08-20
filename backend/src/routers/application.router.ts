import {Router} from "express";
import {applicationController} from "../controllers/application.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {commonMiddleware} from "../middleware/common.middleware";
import {ApplicationValidator} from "../validators/application.validator";
import {applicationMiddleware} from "../middleware/application.middleware";

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
    commonMiddleware.validateBody(ApplicationValidator.validateSetManager),
    authMiddleware.checkAccessToken(),
    applicationController.SetManager
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(ApplicationValidator.validateApplicationUpdate),
    authMiddleware.checkAccessToken(),
    applicationMiddleware.checkUpdateAccess(),
    applicationController.UpdateApplication
);

export const applicationRouter = router;
