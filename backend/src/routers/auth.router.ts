import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {AuthValidator} from "../validators/auth.validator";

const router = Router();

router.post(
    "/sign-in",
    commonMiddleware.validateBody(AuthValidator.signIn),
    authController.SignIn
);

router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.refresh),
    authMiddleware.checkRefreshToken(),
    authController.Refresh
);

router.get(
    "/me",
    authMiddleware.checkAccessToken(),
    authController.Me
);

router.patch(
    '/set-password',
    commonMiddleware.validateBody(AuthValidator.setPassword),
    authController.SetPassword
)

export const authRouter = router;
