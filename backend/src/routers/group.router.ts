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

router.post(
    '/',
    authMiddleware.checkAccessToken(),
    commonMiddleware.validateBody(GroupValidator.validateGroup),
    groupController.CreateGroup
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    commonMiddleware.validateBody(GroupValidator.validateGroup),
    groupController.UpdateGroup
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    groupController.DeleteGroup
);

export const groupRouter = router;
