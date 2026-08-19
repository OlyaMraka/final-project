import {PipelineStage} from "mongoose";
import {LeadFilters} from "../dtos/lead.dto";
import {OrderDirection, SortField} from "../enums/sortField.enum";
import {ILead} from "../interfaces/lead.interface";
import {Lead} from "../models/lead.model";

export type LeadListResult = {
    data: ILead[];
    total: number;
};

class LeadRepository {
    public async getAll(filters: LeadFilters): Promise<LeadListResult> {
        const limit = 25;
        const skip = ((filters.page ?? 1) - 1) * limit;

        const [result] = await Lead.aggregate([
            {$match: this.createLeadMatch(filters)},
            {
                $lookup: {
                    from: "coursetariffs",
                    localField: "courseTariffId",
                    foreignField: "_id",
                    as: "courseTariff"
                }
            },
            {$unwind: "$courseTariff"},
            {
                $lookup: {
                    from: "courses",
                    localField: "courseTariff.courseId",
                    foreignField: "_id",
                    as: "course"
                }
            },
            {$unwind: "$course"},
            {
                $lookup: {
                    from: "tariffs",
                    localField: "courseTariff.tariffId",
                    foreignField: "_id",
                    as: "tariff"
                }
            },
            {$unwind: "$tariff"},
            {
                $lookup: {
                    from: "groups",
                    localField: "groupId",
                    foreignField: "_id",
                    as: "group"
                }
            },
            {$unwind: "$group"},
            {$match: this.createRelatedMatch(filters)},
            {
                $facet: {
                    metadata: [{$count: "total"}],
                    data: [{$sort: this.createSort(filters)}, {$skip: skip}, {$limit: limit}]
                }
            }
        ] as PipelineStage[]);

        return {
            data: result?.data ?? [],
            total: result?.metadata[0]?.total ?? 0
        };
    }

    private createLeadMatch(filters: LeadFilters): Record<string, unknown> {
        const match: Record<string, unknown> = {};

        for (const field of ["name", "surname", "email", "phone"] as const) {
            if (filters[field]) {
                match[field] = this.toSearchRegex(filters[field]);
            }
        }
        for (const field of ["age", "alreadyPaid"] as const) {
            if (filters[field] !== undefined) {
                match[field] = filters[field];
            }
        }
        if (filters.status) {
            match.status = filters.status;
        }

        return match;
    }

    private createRelatedMatch(filters: LeadFilters): Record<string, unknown> {
        const match: Record<string, unknown> = {};

        if (filters.courseName) match["course.name"] = this.toSearchRegex(filters.courseName);
        if (filters.courseFormat) match["courseTariff.courseFormat"] = filters.courseFormat;
        if (filters.courseTariff) match["tariff.name"] = this.toSearchRegex(filters.courseTariff);
        if (filters.groupName) match["group.name"] = this.toSearchRegex(filters.groupName);

        return match;
    }

    private createSort(filters: LeadFilters): Record<string, 1 | -1> {
        const fields: Record<SortField, string> = {
            [SortField.NAME]: "name",
            [SortField.SURNAME]: "surname",
            [SortField.EMAIL]: "email",
            [SortField.AGE]: "age",
            [SortField.COURSE_NAME]: "course.name",
            [SortField.COURSE_FORMAT]: "courseTariff.courseFormat",
            [SortField.COURSE_TARIFF]: "tariff.name",
            [SortField.GROUP_NAME]: "group.name",
            [SortField.PHONE]: "phone",
            [SortField.STATUS]: "status",
            [SortField.ALREADY_PAID]: "alreadyPaid"
        };
        const field = filters.sortField ? fields[filters.sortField] : "createdAt";

        return {[field]: filters.sortOrder === OrderDirection.ASC ? 1 : -1};
    }

    private toSearchRegex(value: string): RegExp {
        return new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    }
}

export const leadRepository = new LeadRepository();
