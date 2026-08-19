import {IGroup} from "../interfaces/group.interface";
import {groupRepository} from "../repositories/group.repository";
import {GroupDto} from "../dtos/group.dto";
import {courseTariffService} from "./courseTariff.service";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {ServiceConstants} from "../constants/error.constants";

class GroupService {
    public getAll(): Promise<IGroup[]> {
        return groupRepository.getAll();
    }

    public getById(groupId: string): Promise<IGroup> {
        return groupRepository.getById(groupId);
    }

    public getByCourseTariffId(courseTariffId: string): Promise<IGroup[]> {
        return groupRepository.getByCourseTariffId(courseTariffId);
    }

    public async create(group: GroupDto): Promise<IGroup> {
        await this.checkCourseTariffReference(group.courseTariffId);

        return  groupRepository.create(group);
    }

    public async updateById(groupId: string, group: GroupDto): Promise<IGroup> {
        await this.checkCourseTariffReference(group.courseTariffId);

        return groupRepository.updateById(groupId, group);
    }

    public deleteById(groupId: string): Promise<IGroup> {
        return groupRepository.deleteById(groupId);
    }

    private async checkCourseTariffReference(courseTariffId: string): Promise<void> {
        const courseTariff = await courseTariffService.getById(courseTariffId);

        if (!courseTariff) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.COURSE_TARIFF_NOT_FOUND);
        }
    }
}

export const groupService = new GroupService();
