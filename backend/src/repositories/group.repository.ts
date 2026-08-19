import {IGroup} from "../interfaces/group.interface";
import {Group} from "../models/group.model";
import {GroupDto} from "../dtos/group.dto";

class GroupRepository {
    public getAll(): Promise<IGroup[]> {
        return Group.find();
    }

    public getById(groupId: string): Promise<IGroup> {
        return Group.findById(groupId);
    }

    public create(group: GroupDto): Promise<IGroup> {
        return Group.create(group);
    }

    public updateById(groupId: string, group: GroupDto): Promise<IGroup> {
        return Group.findByIdAndUpdate(groupId, group, { returnDocument: 'after' });
    }

    public deleteById(groupId: string): Promise<IGroup> {
        return Group.findByIdAndDelete(groupId);
    }
}

export const groupRepository = new GroupRepository();
