import {type FC, useState} from "react";
import type {ApplicationsTableProps} from "../../types/component-props/application-table.ts";
import {Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ApplicationRow from "./application-row/application-row.tsx";
import "./application-table.css";
import type {IApplicationResponse} from "../../types/application.ts";
import EditApplicationForm from "../edit-application-form/edit-application-form.tsx";

const ApplicationsTable: FC<ApplicationsTableProps> = ({applications}) => {
    const [selectedApplication, setSelectedApplication] =
        useState<IApplicationResponse | null>(null);

    const handleEdit = (application: IApplicationResponse) => {
        setSelectedApplication(application);
    };

    const handleCloseEdit = () => {
        setSelectedApplication(null);
    };

    return (
        <>
            <TableContainer className="applications-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />

                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Format</TableCell>
                            <TableCell>Tariff</TableCell>
                            <TableCell>Sum</TableCell>
                            <TableCell>Already Paid</TableCell>
                            <TableCell>Group</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Manager</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {applications && applications.map((application) => (
                            <ApplicationRow
                                key={application._id}
                                application={application}
                                onEdit={handleEdit}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={selectedApplication !== null}
                onClose={handleCloseEdit}
                fullWidth
                maxWidth="md"
            >
                {selectedApplication && (
                    <EditApplicationForm
                        applicationId={selectedApplication._id}
                        application={{
                            name: selectedApplication.name,
                            surname: selectedApplication.surname,
                            email: selectedApplication.email,
                            age: selectedApplication.age,
                            phone: selectedApplication.phone,
                            course: selectedApplication.course,
                            format: selectedApplication.format,
                            tariff: selectedApplication.tariff,
                            status: selectedApplication.status,
                            groupId: selectedApplication.groupId?._id ?? "",
                            alreadyPaid: selectedApplication.alreadyPaid,
                            sum: selectedApplication.sum,
                        }}
                        onCancel={handleCloseEdit}
                    />
                )}
            </Dialog>
        </>

    );
};

export default ApplicationsTable;
