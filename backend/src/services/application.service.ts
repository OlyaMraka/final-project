import {ApplicationFilters, SetManagerDto} from "../dtos/application.dto";
import {ApplicationListResult, applicationRepository} from "../repositories/application.repository";
import {IApplication} from "../interfaces/application.interface";

class ApplicationService {
    public getAll(filters: ApplicationFilters): Promise<ApplicationListResult> {
        return applicationRepository.getAll(filters);
    }

    public setManager(applicationId: string, manager: SetManagerDto): Promise<IApplication> {
        return applicationRepository.setManager(applicationId, manager.managerId);
    }
}

export const applicationService = new ApplicationService();
