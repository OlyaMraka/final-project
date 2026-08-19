import {ITariff} from "../interfaces/tariff.interface";
import {tariffRepository} from "../repositories/tariff.repository";
import {TariffDto} from "../dtos/tariff.dto";

class TariffService {
    public getAll(): Promise<ITariff[]> {
        return tariffRepository.getAll();
    }

    public create(tariff: TariffDto): Promise<ITariff> {
        return tariffRepository.create(tariff);
    }

    public async getById(tariffId: string): Promise<ITariff> {
        return tariffRepository.getById(tariffId);
    }

    public updateById(tariffId: string, tariff: TariffDto): Promise<ITariff> {
        return tariffRepository.updateById(tariffId, tariff);
    }

    public deleteById(tariffId: string): Promise<ITariff> {
        return tariffRepository.deleteById(tariffId);
    }
}

export const tariffService = new TariffService();
