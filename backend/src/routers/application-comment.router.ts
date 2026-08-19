import {Router} from "express";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {commentController} from "../controllers/application-comment.controller";

const router = Router();

router.get(
    '/application/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    commentController.GetCommentsByApplicationId
);

router.post(
    '/',
    authMiddleware.checkAccessToken(),
    commentController.CreateComment
);

router.put(
    '/:id',
    authMiddleware.checkAccessToken(),
    commentController.UpdateComment
);

router.delete(
    '/:id',
    authMiddleware.checkAccessToken(),
    commentController.DeleteComment
);

export const commentRouter = router;
