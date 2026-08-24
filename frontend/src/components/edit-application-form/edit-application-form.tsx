import {type FC, useState} from "react";
import type {EditableApplicationInformation, EditApplicationFormProps} from "../../types/component-props/edit-application-form.ts";
import {type SelectChangeEvent, TextField} from "@mui/material";
import {CourseName} from "../../enums/course-name.enum.ts";
import {CourseFormat} from "../../enums/course-format.enum.ts";
import {TariffName} from "../../enums/tariff-name.enum.ts";
import FormDropdown from "./form-dropdown/form-dropdown.tsx";
import {ApplicationStatus} from "../../enums/application-status.enum.ts";
import ApplicationGroupDropdown from "./form-dropdown/group-dropdown.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {applicationSliceActions} from "../../redux/slices/application-slice.ts";
import CreateGroupDialog from "./create-group-dialog/create-group-dialog.tsx";
import "./edit-application-form.css";

const EditApplicationForm: FC<EditApplicationFormProps> = ({applicationId, application, onCancel}) => {
    const [formData, setFormData] =
        useState<EditableApplicationInformation>({
            name: application.name,
            surname: application.surname,
            email: application.email,
            age: application.age,
            phone: application.phone,

            course: application.course,
            format: application.format,
            tariff: application.tariff,
            status: application.status,

            groupId: application.groupId,

            alreadyPaid: application.alreadyPaid,
            sum: application.sum,
        });

    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await dispatch(
                applicationSliceActions.updateApplication({
                    applicationId: applicationId,
                    application: formData,
                })
            ).unwrap();

            onCancel();
        } catch (error) {
            console.error("Failed to update application:", error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleApplicationGroupChange = (groupId: string) => {
        setFormData(prev => ({
            ...prev,
            groupId,
        }));
    }

    return (
        <div className="edit-application-form-block">
            <h2>Edit Application</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-fields-container">
                    <div className="first-column">
                        <TextField className="form-text-input" label="Name" type="text" name="name"
                                   value={formData.name} onChange={handleInputChange}/>

                        <TextField className="form-text-input" label="Surname" type="text" name="surname"
                                   value={formData.surname} onChange={handleInputChange}/>

                        <TextField className="form-text-input" label="Email" type="text" name="email"
                                   value={formData.email} onChange={handleInputChange}/>

                        <TextField className="form-text-input" label="Phone" type="text" name="phone"
                                   value={formData.phone} onChange={handleInputChange}/>

                        <TextField className="form-text-input" label="Age" type="number" name="age"
                                   value={formData.age} onChange={handleInputChange}/>

                        <TextField className="form-text-input" label="Sum" type="number" name="sum"
                                   value={formData.sum} onChange={handleInputChange}/>
                    </div>

                    <div className="second-column">
                        <TextField className="form-text-input" label="Already Paid" type="number" name="alreadyPaid"
                                   value={formData.alreadyPaid} onChange={handleInputChange}/>

                        <FormDropdown
                            label="Course"
                            name="course"
                            value={formData.course}
                            values={Object.values(CourseName)}
                            onChange={handleSelectChange}
                        />

                        <FormDropdown
                            label="Format"
                            name="format"
                            value={formData.format}
                            values={Object.values(CourseFormat)}
                            onChange={handleSelectChange}
                        />

                        <FormDropdown
                            label="Tariff"
                            name="tariff"
                            value={formData.tariff}
                            values={Object.values(TariffName)}
                            onChange={handleSelectChange}
                        />

                        <FormDropdown
                            label="Status"
                            name="status"
                            value={formData.status}
                            values={Object.values(ApplicationStatus)}
                            onChange={handleSelectChange}
                        />

                        <div className="group-change-container">
                            <ApplicationGroupDropdown
                                groupId={formData.groupId}
                                onGroupChange={handleApplicationGroupChange}
                            />
                            <button
                                type="button"
                                className="add-new-group-button"
                                onClick={() => setIsCreateGroupOpen(true)}
                            >
                                + Add new group
                            </button>
                        </div>
                    </div>
                </div>

                <div className="operations-block">
                    <button className="save-application">Save</button>
                    <button className="cancel-editing" onClick={onCancel}>Cancel</button>
                </div>
            </form>

            <CreateGroupDialog
                open={isCreateGroupOpen}
                onClose={() => setIsCreateGroupOpen(false)}
            />
        </div>
    );
};

export default EditApplicationForm;
