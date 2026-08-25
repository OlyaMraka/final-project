import {ApplicationDto, ApplicationExcelRow, ApplicationFilters, IApplicationResponse} from "../dtos/application.dto";
import {ApplicationListResult, applicationRepository} from "../repositories/application.repository";
import {IApplication} from "../interfaces/application.interface";
import Exceljs from "exceljs";
import {ApplicationStatistics} from "../dtos/application-statistics.dto";

class ApplicationService {
    public getAll(filters: ApplicationFilters): Promise<ApplicationListResult> {
        return applicationRepository.getAll(filters);
    }

    public async generateTable(
        filters: ApplicationFilters
    ): Promise<Buffer> {

        const applications =
            await applicationRepository.getAllWithFilters(filters);

        const rows = this.mapToExcelRows(
            applications
        );

        const workbook = new Exceljs.Workbook();
        const worksheet = workbook.addWorksheet("Applications");

        worksheet.columns = [
            { header: "Application Id", key: "applicationId" },

            { header: "Name", key: "name" },
            { header: "Surname", key: "surname" },
            { header: "Email", key: "email" },
            { header: "Phone", key: "phone" },

            { header: "Course", key: "course" },
            { header: "Tariff", key: "tariff" },
            { header: "Format", key: "format" },
            { header: "Status", key: "status" },

            { header: "Sum", key: "sum" },
            { header: "Already Paid", key: "alreadyPaid" },

            { header: "Manager Id", key: "managerId" },
            { header: "Manager Name", key: "managerName" },
            { header: "Manager Surname", key: "managerSurname" },

            { header: "Group Id", key: "groupId" },
            { header: "Group Name", key: "groupName" },
        ];

        worksheet.addRows(rows);

        const buffer = await workbook.xlsx.writeBuffer();

        return Buffer.from(buffer);
    }

    public getById(applicationId: string): Promise<IApplication> {
        return applicationRepository.getById(applicationId);
    }

    public setManager(applicationId: string, managerId: string): Promise<IApplication> {
        return applicationRepository.setManager(applicationId, managerId);
    }

    public updateApplicationById(applicationId: string, application: ApplicationDto): Promise<IApplicationResponse> {
        return applicationRepository.updateApplicationById(applicationId, application);
    }

    public getStatistics(): Promise<ApplicationStatistics> {
        return applicationRepository.getStatistics();
    }

    private mapToExcelRows(
        applications: IApplicationResponse[]
    ): ApplicationExcelRow[] {

        return applications.map(application => ({
            applicationId: application._id,

            name: application.name,
            surname: application.surname,
            email: application.email,
            phone: application.phone,

            course: application.course,
            tariff: application.tariff,
            format: application.format,
            status: application.status,

            sum: application.sum,
            alreadyPaid: application.alreadyPaid,

            managerId: application.managerId?._id ?? "",
            managerName: application.managerId?.name ?? "",
            managerSurname: application.managerId?.surname ?? "",

            groupId: application.groupId?._id ?? "",
            groupName: application.groupId?.name ?? "",
        }));
    }
}

export const applicationService = new ApplicationService();
