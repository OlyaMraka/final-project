import {IGroup} from "../interfaces/group.interface";
import {groupRepository} from "../repositories/group.repository";
import {GroupDto} from "../dtos/group.dto";

class GroupService {
    public getAll(): Promise<IGroup[]> {
        return groupRepository.getAll();
    }

    public getById(groupId: string): Promise<IGroup> {
        return groupRepository.getById(groupId);
    }

    public async create(group: GroupDto): Promise<IGroup> {
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
