import {Router} from "express";
import {tariffController} from "../controllers/tariff.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {commonMiddleware} from "../middleware/common.middleware";
import {TariffValidator} from "../validators/tariff.validator";

const router = Router();

router.get(
    '/',
    authMiddleware.checkAccessToken(),
    tariffController.GetAllTariffs
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    tariffController.GetTariffById
);

router.post(
    '/',
    commonMiddleware.validateBody(TariffValidator.validateTariff),
    authMiddleware.checkAccessToken(),
    tariffController.CreateTariff
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(TariffValidator.validateTariff),
    authMiddleware.checkAccessToken(),
    tariffController.UpdateTariff
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    tariffController.DeleteTariff
);

export const tariffRouter = router;
