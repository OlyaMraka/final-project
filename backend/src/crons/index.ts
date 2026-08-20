import {removeOldTokensCron} from "./remove-old-tokens.cron";

export const cronsRunner = async () => {

    removeOldTokensCron.start();
};