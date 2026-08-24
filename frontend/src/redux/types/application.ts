import type {IApplicationResponse} from "../../types/application.ts";
import type {EditableApplicationInformation} from "../../types/component-props/edit-application-form.ts";

export type ApplicationSliceType = {
    applications?: IApplicationResponse[];
    total?: number;
    page?: number;
    limit?: number;
    pagesCount?: number
}

export type EditApplicationParams = {
    applicationId: string;
    application: EditableApplicationInformation;
}
