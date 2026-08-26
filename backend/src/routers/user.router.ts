import {Router} from 'express';
import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.get('/',
    authMiddleware.checkAccessToken(),
    authMiddleware.checkAdminAccess(),
    userController.GetAllUsers
);

router.get(
    '/managers',
    commonMiddleware.validateQuery(UserValidator.validateFilters),
    authMiddleware.checkAccessToken(),
    authMiddleware.checkAdminAccess(),
    userController.GetManagers
);

router.post(
    '/',
    authMiddleware.checkAccessToken(),
    authMiddleware.checkAdminAccess(),
    commonMiddleware.validateBody(UserValidator.validateUser),
    userController.CreateUser,
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    authMiddleware.checkAdminAccess(),
    userController.GetUserById
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    commonMiddleware.validateBody(UserValidator.validateUser),
    userController.UpdateById
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    authMiddleware.checkAdminAccess(),
    userController.DeleteUserById
);

router.patch(
    '/:id/ban',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    authMiddleware.checkAdminAccess(),
    userController.BanUserById
);

router.patch(
    '/:id/unban',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    authMiddleware.checkAdminAccess(),
    userController.UnbanUserById
);

router.patch(
    '/:id/activate',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    authMiddleware.checkAdminAccess(),
    userController.ActivateUserById
);

router.patch(
    '/:id/resover-password',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    authMiddleware.checkAdminAccess(),
    userController.RecoverUserPassword
);

export const userRouter = router;
