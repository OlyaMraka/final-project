import {ICourseTariff} from "../interfaces/courseTariff.interface";
import {courseTariffRepository} from "../repositories/courseTariff.repository";
import {CourseTariffDto} from "../dtos/courseTariff.dto";
import {courseService} from "./course.service";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {ServiceConstants} from "../constants/error.constants";
import {tariffService} from "./tariff.service";

class CourseTariffService {
    public getAll(): Promise<ICourseTariff[]> {
        return courseTariffRepository.getAll();
    }

    public getById(courseTariffId: string): Promise<ICourseTariff> {
        return courseTariffRepository.getById(courseTariffId);
    }

    public async create(courseTariff: CourseTariffDto): Promise<ICourseTariff> {
        await this.checkCourseTariffReferences(courseTariff);
        return courseTariffRepository.create(courseTariff);
    }

    public async updateById(courseTariffId: string, courseTariff: CourseTariffDto): Promise<ICourseTariff> {
        await this.checkCourseTariffReferences(courseTariff);
        return courseTariffRepository.updateById(courseTariffId, courseTariff);
    }

    public async deleteById(courseTariffId: string): Promise<ICourseTariff> {
        return courseTariffRepository.deleteById(courseTariffId);
    }

    private async checkCourseTariffReferences(courseTariff: CourseTariffDto): Promise<void> {
        const course = await courseService.getById(courseTariff.courseId);

        if(!course) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.COURSE_NOT_FOUND)
        }

        const tariff = await tariffService.getById(courseTariff.tariffId);

        if(!tariff) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.TARIFF_NOT_FOUND);
        }
    }
}

export const courseTariffService = new CourseTariffService();
