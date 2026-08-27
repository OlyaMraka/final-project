import { type FC, useState } from "react";
import type {
    ApplicationRowProps,
    CommentAuthor,
} from "../../../types/component-props/application-table.ts";
import {Collapse, IconButton, TableCell, TableRow, Tooltip} from "@mui/material";
import {
    EditOutlined,
    KeyboardArrowDownOutlined,
    KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import ApplicationDetails from "../application-details/application-details.tsx";
import "./application-row.css";
import {useAppSelector} from "../../../redux/hooks/useAppSelector.tsx";

const ApplicationRow: FC<ApplicationRowProps> = ({ application, onEdit }) => {
    const { user } = useAppSelector(({ userSlice }) => userSlice);
    const isAuthor = !application.managerId || user?._id === application.managerId?._id;

    const [open, setOpen] = useState(false);

    const author: CommentAuthor = {
        author_id: application.managerId?._id,
        author_name: application.managerId?.name,
        author_surname: application.managerId?.surname,
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {open ? (
                            <KeyboardArrowUpOutlined />
                        ) : (
                            <KeyboardArrowDownOutlined />
                        )}
                    </IconButton>

                    { isAuthor &&
                        <Tooltip title="Edit application">
                            <IconButton
                                size="small"
                                onClick={() => onEdit(application)}
                            >
                                <EditOutlined fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    }
                </TableCell>

                <TableCell>{application._id}</TableCell>
                <TableCell>{application.name ?? "-"}</TableCell>
                <TableCell>{application.surname ?? "-"}</TableCell>
                <TableCell>{application.email ?? "-"}</TableCell>
                <TableCell>{application.phone ?? "-"}</TableCell>
                <TableCell>{application.age ?? "-"}</TableCell>
                <TableCell>{application.course ?? "-"}</TableCell>
                <TableCell>{application.format ?? "-"}</TableCell>
                <TableCell>{application.tariff ?? "-"}</TableCell>
                <TableCell>{application.sum ?? "-"}</TableCell>
                <TableCell>{application.alreadyPaid ?? "-"}</TableCell>
                <TableCell>{application.groupId?.name ?? "-"}</TableCell>

                <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>{application.status}</TableCell>

                <TableCell>
                    {application.managerId
                        ? application.managerId.surname
                        : "-"}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={16}>
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                    >
                        {author && (
                            <ApplicationDetails
                                applicationId={application._id}
                                message={application.message}
                                utm={application.utm}
                                author={author}
                            />
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ApplicationRow;