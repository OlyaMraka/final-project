import type { FC } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { CommentViewProps } from "../../../../types/component-props/application-table.ts";
import { useAppSelector } from "../../../../redux/hooks/useAppSelector.tsx";
import "./comment-view.css";

const CommentView: FC<CommentViewProps> = ({commentId, text, author, createdAt, onEdit, onDelete,}) => {
    const { user } = useAppSelector(({ userSlice }) => userSlice);

    const isAuthor = user?._id === author.author_id;

    const handleDelete = () => {
        onDelete(commentId);
    }

    return (
        <div className="comment-view-block">
            <p>{text}</p>

            <div className="comment-view-additional-info">
                <span>{author.author_name} {author.author_surname}</span>
                <span>{createdAt}</span>

                {isAuthor && (
                    <div className="comment-view-actions">
                        <IconButton size="small" onClick={onEdit} aria-label="edit comment">
                            <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton size="small" onClick={handleDelete} aria-label="delete comment">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentView;