import {Tariff} from "../models/tariff.model";

class TariffSeeder {
    public async seed(): Promise<void> {
        const tariffs = ["pro", "minimal", "premium", "incubator", "vip"].map((name) => ({name}));

        await Tariff.bulkWrite(
            tariffs.map((tariff) => ({
                updateOne: {
                    filter: tariff,
                    update: {$setOnInsert: tariff},
                    upsert: true,
                },
            }))
        );
    }
}

export const tariffSeeder = new TariffSeeder();
