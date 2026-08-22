import type {FC} from "react";
import type {ApplicationsTableProps} from "../../types/component-props/application-table.ts";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ApplicationRow from "./application-row/application-row.tsx";
import "./application-table.css";

const ApplicationsTable: FC<ApplicationsTableProps> = ({applications}) => {
    return (
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
                        <TableCell>Manager</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {applications && applications.map((application) => (
                        <ApplicationRow
                            key={application._id}
                            application={application}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ApplicationsTable;
