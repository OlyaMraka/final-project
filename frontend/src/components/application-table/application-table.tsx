import {type FC, useState} from "react";
import type {ApplicationsTableProps} from "../../types/component-props/application-table.ts";
import {Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ApplicationRow from "./application-row/application-row.tsx";
import "./application-table.css";
import type {IApplicationResponse} from "../../types/application.ts";
import EditApplicationForm from "../edit-application-form/edit-application-form.tsx";
import {useSearchParams} from "react-router-dom";
import {OrderDirection, SortField} from "../../enums/sort-field.enum.ts";

const ApplicationsTable: FC<ApplicationsTableProps> = ({applications}) => {
    const [selectedApplication, setSelectedApplication] =
        useState<IApplicationResponse | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortField = searchParams.get("sortField");
    const currentSortOrder = searchParams.get("sortOrder");

    const handleEdit = (application: IApplicationResponse) => {
        setSelectedApplication(application);
    };

    const handleCloseEdit = () => {
        setSelectedApplication(null);
    };

    const handleSort = (field: SortField) => {
        const params = new URLSearchParams(searchParams);

        if (currentSortField === field) {
            params.set(
                "sortOrder",
                currentSortOrder === OrderDirection.DESC
                    ? OrderDirection.ASC
                    : OrderDirection.DESC
            );
        } else {
            params.set("sortField", field);
            params.set("sortOrder", OrderDirection.DESC);
        }

        params.set("page", "1");

        setSearchParams(params);
    };

    return (
        <>
            <TableContainer className="applications-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />

                            <TableCell onClick={() => handleSort(SortField.ID)}>ID</TableCell>
                            <TableCell onClick={() => handleSort(SortField.NAME)}>Name</TableCell>
                            <TableCell onClick={() => handleSort(SortField.SURNAME)}>Surname</TableCell>
                            <TableCell onClick={() => handleSort(SortField.EMAIL)}>Email</TableCell>
                            <TableCell onClick={() => handleSort(SortField.PHONE)}>Phone</TableCell>
                            <TableCell onClick={() => handleSort(SortField.AGE)}>Age</TableCell>
                            <TableCell onClick={() => handleSort(SortField.COURSE)}>Course</TableCell>
                            <TableCell onClick={() => handleSort(SortField.FORMAT)}>Format</TableCell>
                            <TableCell onClick={() => handleSort(SortField.TARIFF)}>Tariff</TableCell>
                            <TableCell onClick={() => handleSort(SortField.SUM)}>Sum</TableCell>
                            <TableCell onClick={() => handleSort(SortField.ALREADY_PAID)}>Already Paid</TableCell>
                            <TableCell onClick={() => handleSort(SortField.GROUP_ID)}>Group</TableCell>
                            <TableCell onClick={() => handleSort(SortField.CREATED_AT)}>Created At</TableCell>
                            <TableCell onClick={() => handleSort(SortField.STATUS)}>Status</TableCell>
                            <TableCell onClick={() => handleSort(SortField.MANAGER_ID)}>Manager</TableCell>
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
