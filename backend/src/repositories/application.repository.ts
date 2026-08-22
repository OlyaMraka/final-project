import {Application} from "../models/application.model";
import {IApplication} from "../interfaces/application.interface";
import {ApplicationDto, ApplicationFilters} from "../dtos/application.dto";
import {OrderDirection, SortField} from "../enums/sort-field.enum";
import {ApplicationStatus} from "../enums/application-status.enum";

const PAGE_SIZE = 25;

type LeadFilter = {
    name?: RegExp;
    surname?: RegExp;
    email?: RegExp;
    phone?: RegExp;

    age?: number;

    course?: IApplication["course"];
    tariff?: IApplication["tariff"];
    format?: IApplication["format"];

    groupId?: string;

    status?: IApplication["status"];

    startDate?: {
        $gte?: Date;
        $lte?: Date;
    };

    endDate?: {
        $gte?: Date;
        $lte?: Date;
    };
};

type ApplicationSort = {
    [key: string]: 1 | -1;
};

export type ApplicationListResult = {
    applications: IApplication[];
    total: number;
    page: number;
    limit: number;
    pagesCount: number
};

class ApplicationRepository {

    public async getAll(
        filters: ApplicationFilters
    ): Promise<ApplicationListResult> {

        const page = filters.page ?? 1;
        const skip = (page - 1) * PAGE_SIZE;

        const filter = this.createFilter(filters);
        const sort = this.createSort(filters);

        const [data, total] = await Promise.all([
            Application.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(PAGE_SIZE)
                .lean(),

            Application.countDocuments(filter),
        ]);

        return {
            applications: data,
            total,
            page,
            limit: PAGE_SIZE,
            pagesCount: Math.ceil(total / PAGE_SIZE),
        };
    }

    public getById(applicationId: string): Promise<IApplication> {
        return Application.findById(applicationId);
    }

    public setManager(applicationId: string, managerId: string): Promise<IApplication> {
        return Application.findByIdAndUpdate(applicationId, {
            managerId: managerId,
            status: ApplicationStatus.IN_WORK
        }, { returnDocument: 'after' });
    }

    public updateApplicationById(applicationId: string, application: ApplicationDto): Promise<IApplication> {
        return Application.findByIdAndUpdate(applicationId, application, { returnDocument: 'after' });
    }

    private createFilter(
        filters: ApplicationFilters
    ): LeadFilter {

        const filter: LeadFilter = {};

        if (filters.name) {
            filter.name = this.createSearchRegex(filters.name);
        }

        if (filters.surname) {
            filter.surname = this.createSearchRegex(filters.surname);
        }

        if (filters.email) {
            filter.email = this.createSearchRegex(filters.email);
        }

        if (filters.phone) {
            filter.phone = this.createSearchRegex(filters.phone);
        }

        if (filters.age !== undefined) {
            filter.age = filters.age;
        }

        if (filters.course) {
            filter.course = filters.course;
        }

        if (filters.tariff) {
            filter.tariff = filters.tariff;
        }

        if (filters.format) {
            filter.format = filters.format;
        }

        if (filters.groupId) {
            filter.groupId = filters.groupId;
        }

        if (filters.status) {
            filter.status = filters.status;
        }

        if (filters.startDate) {
            filter.startDate = {
                ...filter.startDate,
                $gte: filters.startDate,
            };
        }

        if (filters.endDate) {
            filter.endDate = {
                ...filter.endDate,
                $lte: filters.endDate,
            };
        }

        return filter;
    }

    private createSort(
        filters: ApplicationFilters
    ): ApplicationSort {

        const sortField = filters.sortField ?? SortField.NAME;

        const sortDirection =
            filters.sortOrder === OrderDirection.DESC
                ? -1
                : 1;

        return {
            [sortField]: sortDirection,
        };
    }

    private createSearchRegex(
        value: string
    ): RegExp {

        const escapedValue = value.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        return new RegExp(escapedValue, "i");
    }
}

export const applicationRepository = new ApplicationRepository();
