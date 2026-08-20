import {Router} from "express";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {commentController} from "../controllers/application-comment.controller";
import {ApplicationCommentValidator} from "../validators/application-comment.validator";

const router = Router();

router.get(
    '/application/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    commentController.GetCommentsByApplicationId
);

router.post(
    '/',
    commonMiddleware.validateBody(ApplicationCommentValidator.validateCreateCommentBody),
    authMiddleware.checkAccessToken(),
    commentController.CreateComment
);

router.put(
    '/:id',
    commonMiddleware.validateBody(ApplicationCommentValidator.validateUpdateCommentBody),
    authMiddleware.checkAccessToken(),
    commentController.UpdateComment
);

router.delete(
    '/:id',
    authMiddleware.checkAccessToken(),
    commentController.DeleteComment
);

export const commentRouter = router;
