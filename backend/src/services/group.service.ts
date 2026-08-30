import {IGroup} from "../interfaces/group.interface";
import {groupRepository} from "../repositories/group.repository";
import {GroupDto} from "../dtos/group.dto";
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

    public async create(group: GroupDto): Promise<IGroup> {
        const existingGroup = await groupRepository.findByName(group.name);

        if (existingGroup) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                ServiceConstants.GROUP_ALREADY_EXISTS
            );
        }

        return  groupRepository.create(group);
    }

    public async updateById(groupId: string, group: GroupDto): Promise<IGroup> {
        return groupRepository.updateById(groupId, group);
    }

    public deleteById(groupId: string): Promise<IGroup> {
        return groupRepository.deleteById(groupId);
    }
}

export const groupService = new GroupService();
