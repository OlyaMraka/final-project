import {ICourseTariff} from "../interfaces/courseTariff.interface";
import {CourseTariff} from "../models/courseTariff.model";
import {CourseTariffDto} from "../dtos/courseTariff.dto";

class CourseTariffRepository {
    public getAll(): Promise<ICourseTariff[]> {
        return CourseTariff.find();
    }

    public getById(courseTariffId: string): Promise<ICourseTariff> {
        return CourseTariff.findById(courseTariffId);
    }

    public create(courseTariff: CourseTariffDto): Promise<ICourseTariff> {
        return CourseTariff.create(courseTariff);
    }

    public updateById(courseTariffId: string, courseTariff: CourseTariffDto): Promise<ICourseTariff> {
        return CourseTariff.findByIdAndUpdate(courseTariffId, courseTariff, { returnDocument: 'after' });
    }

    public deleteById(courseTariffId: string): Promise<ICourseTariff> {
        return CourseTariff.findByIdAndDelete(courseTariffId);
    }
}

export const courseTariffRepository = new CourseTariffRepository();
