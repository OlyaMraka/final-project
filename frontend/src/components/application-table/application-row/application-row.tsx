import {type FC, useState} from "react";
import type {ApplicationRowProps} from "../../../types/component-props/application-table.ts";
import {Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import {KeyboardArrowDownOutlined, KeyboardArrowUpOutlined} from "@mui/icons-material";
import "./application-row.css";

const ApplicationRow: FC<ApplicationRowProps> = ({application}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {open ? (<KeyboardArrowUpOutlined />) : (<KeyboardArrowDownOutlined />)}
                    </IconButton>
                </TableCell>

                <TableCell>{application._id}</TableCell>
                <TableCell>{application.name}</TableCell>
                <TableCell>{application.surname}</TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell>{application.phone}</TableCell>
                <TableCell>{application.age}</TableCell>
                <TableCell>{application.course}</TableCell>
                <TableCell>{application.format}</TableCell>
                <TableCell>{application.tariff}</TableCell>
                <TableCell>{application.sum}</TableCell>
                <TableCell>{application.alreadyPaid}</TableCell>
                <TableCell>{application.groupId?.name ?? "-"}</TableCell>

                <TableCell>
                    {new Date(
                        application.createdAt
                    ).toLocaleDateString()}
                </TableCell>

                <TableCell>
                    {application.managerId
                        ? application.managerId.surname
                        : "-"}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={15}>
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                    >
                        Hello world
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ApplicationRow;
