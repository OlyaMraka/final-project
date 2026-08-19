import {LeadFilters} from "../dtos/lead.dto";
import {LeadListResult, leadRepository} from "../repositories/lead.repository";

class LeadService {
    public getAll(filters: LeadFilters): Promise<LeadListResult> {
        return leadRepository.getAll(filters);
    }
}

export const leadService = new LeadService();
