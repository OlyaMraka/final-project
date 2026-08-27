import type {CourseName} from "../../enums/course-name.enum.ts";
import type {CourseFormat} from "../../enums/course-format.enum.ts";
import type {TariffName} from "../../enums/tariff-name.enum.ts";
import type {ApplicationStatus} from "../../enums/application-status.enum.ts";
import type {SelectChangeEvent} from "@mui/material";

export type EditApplicationFormProps = {
    applicationId: string;
    application: EditableApplicationInformation;
    onCancel: () => void;
}

export type EditableApplicationInformation = {
    name?: string;
    surname?: string;
    email?: string;
    age?: number;
    phone?: string;

    course?: CourseName;
    format?: CourseFormat;
    tariff?: TariffName;
    status?: ApplicationStatus;
    groupId?: string;

    alreadyPaid?: number;
    sum?: number;
}

export type FormDropdownProps = {
    label: string;
    name: string;
    value: string;
    values: string[];
    onChange: (event: SelectChangeEvent) => void;
};

export type ApplicationGroupDropdownProps = {
    groupId: string | null;
    onGroupChange: (groupId: string | null) => void;
};