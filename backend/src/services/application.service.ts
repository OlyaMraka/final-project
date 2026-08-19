import {ApplicationFilters} from "../dtos/application.dto";
import {ApplicationListResult, applicationRepository} from "../repositories/application.repository";

class ApplicationService {
    public getAll(filters: ApplicationFilters): Promise<ApplicationListResult> {
        return applicationRepository.getAll(filters);
    }
}

export const applicationService = new ApplicationService();
