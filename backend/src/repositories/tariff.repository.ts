import {ITariff} from "../interfaces/tariff.interface";
import {Tariff} from "../models/tariff.model";
import {TariffDto} from "../dtos/tariff.dto";

class TariffRepository {
    public getAll(): Promise<ITariff[]> {
        return Tariff.find();
    }

    public getById(tariffId: string): Promise<ITariff> {
        return Tariff.findById(tariffId);
    }

    public create(tariff: TariffDto): Promise<ITariff> {
        return Tariff.create(tariff);
    }

    public updateById(tariffId: string, tariff: TariffDto): Promise<ITariff> {
        return Tariff.findByIdAndUpdate(tariffId, tariff, { returnDocument: 'after' });
    }

    public deleteById(tariffId: string): Promise<ITariff> {
        return Tariff.findByIdAndDelete(tariffId);
    }
}

export const tariffRepository = new TariffRepository();
