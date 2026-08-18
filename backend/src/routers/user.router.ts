import {Router} from 'express';
import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.get('/', userController.GetAllUsers);

router.post(
    '/',
    authMiddleware.checkAccessToken(),
    commonMiddleware.validateBody(UserValidator.validateUser),
    userController.CreateUser,
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    userController.GetUserById);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    commonMiddleware.validateBody(UserValidator.validateUser),
    userController.UpdateById);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    userController.DeleteUserById
);

router.patch(
    '/:id/ban',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    userController.BanUserById
);

router.patch(
    '/:id/unban',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    userController.BanUserById
);

router.patch(
    '/:id/activate',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    userController.ActivateUserById
);

export const userRouter = router;
