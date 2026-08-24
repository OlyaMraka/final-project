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
    applicationController.GetAllApplications
);

router.post(
    '/set-manager/:id',
    commonMiddleware.isIdValid("id"),
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

router.get(
    '/export',
    commonMiddleware.validateQuery(ApplicationValidator.validateFilters),
    authMiddleware.checkAccessToken(),
    applicationController.ExportApplications
);

export const applicationRouter = router;
