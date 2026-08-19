import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {groupController} from "../controllers/group.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {GroupValidator} from "../validators/group.validator";

const router = Router();

router.get(
    '/',
    authMiddleware.checkAccessToken(),
    groupController.GetAllGroups
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    groupController.GetGroupById
);

router.get(
    '/course-tariff/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    groupController.GetGroupsByCourseTariffId
);

router.post(
    '/',
    commonMiddleware.validateBody(GroupValidator.validateGroup),
    authMiddleware.checkAccessToken(),
    groupController.CreateGroup
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(GroupValidator.validateGroup),
    authMiddleware.checkAccessToken(),
    groupController.UpdateGroup
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    groupController.DeleteGroup
);

export const groupRouter = router;
