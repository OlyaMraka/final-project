import {type FC, useState} from "react";
import { IconButton, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import type {CommentEditProps} from "../../../../types/component-props/application-table.ts";
import "./comment-edit.css";

const CommentEdit: FC<CommentEditProps> = ({commentId, text, onSave, onCancel}) => {
    const [value, setValue] = useState(text);

    const handleSave = () => {
        onSave(commentId, value);
    };

    return (
        <div className="comment-edit-block">
            <TextField fullWidth multiline value={value}
                onChange={(event) => setValue(event.target.value)}/>

            <div className="comment-edit-actions">
                <IconButton size="small" onClick={handleSave} aria-label="save comment">
                    <CheckIcon />
                </IconButton>

                <IconButton size="small" onClick={onCancel} aria-label="cancel editing">
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CommentEdit;
