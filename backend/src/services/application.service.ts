import {ApplicationDto, ApplicationFilters} from "../dtos/application.dto";
import {ApplicationListResult, applicationRepository} from "../repositories/application.repository";
import {IApplication} from "../interfaces/application.interface";

class ApplicationService {
    public getAll(filters: ApplicationFilters): Promise<ApplicationListResult> {
        return applicationRepository.getAll(filters);
    }

    public getById(applicationId: string): Promise<IApplication> {
        return applicationRepository.getById(applicationId);
    }

    public setManager(applicationId: string, managerId: string): Promise<IApplication> {
        return applicationRepository.setManager(applicationId, managerId);
    }

    public updateApplicationById(applicationId: string, application: ApplicationDto): Promise<IApplication> {
        return applicationRepository.updateApplicationById(applicationId, application);
    }
}

export const applicationService = new ApplicationService();
