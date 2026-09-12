import {Router} from "express";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {commentController} from "../controllers/application-comment.controller";
import {ApplicationCommentValidator} from "../validators/application-comment.validator";
import {applicationCommentMiddleware} from "../middleware/application-comment.middleware";

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
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(ApplicationCommentValidator.validateUpdateCommentBody),
    authMiddleware.checkAccessToken(),
    applicationCommentMiddleware.checkAuthorAccess(),
    commentController.UpdateComment
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    applicationCommentMiddleware.checkAuthorAccess(),
    commentController.DeleteComment
);

export const commentRouter = router;
