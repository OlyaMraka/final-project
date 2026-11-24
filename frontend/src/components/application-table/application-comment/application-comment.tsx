import { type FC, useState } from "react";
import CommentView from "./comment-view/comment-view.tsx";
import CommentEdit from "./comment-edit/comment-edit.tsx";
import {deleteComment, updateComment} from "../../../services/comment.service.ts";
import type {CommentComponentProps} from "../../../types/component-props/application-table.ts";
import {Alert} from "@mui/material";
import {getErrorMessage} from "../../../helpers/error-message.helper.ts";

const Comment: FC<CommentComponentProps> = ({comment, onDeleted}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(comment.text);
    const [actionError, setActionError] = useState("");

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setText(comment.text);
        setActionError("");
        setIsEditing(false);
    };

    const handleUpdate = async (commentId: string, newText: string) => {
        try {
            const updatedComment = await updateComment(
                commentId,
                newText
            );

            setText(updatedComment.text);
            setIsEditing(false);
            setActionError("");
        } catch (error) {
            setActionError(getErrorMessage(error, "Failed to update comment."));
        }
    };

    const handleDelete = async (commentId: string) => {
        try {
            await deleteComment(commentId);

            onDeleted(commentId);
            setActionError("");
        } catch (error) {
            setActionError(getErrorMessage(error, "Failed to delete comment."));
        }
    };

    if (isEditing) {
        return (
            <div>
                {actionError && <Alert severity="error" sx={{mb: 1}}>{actionError}</Alert>}
                <CommentEdit commentId={comment._id} text={text} onSave={handleUpdate} onCancel={handleCancel}/>
            </div>
        );
    }

    return (
        <div>
            {actionError && <Alert severity="error" sx={{mb: 1}}>{actionError}</Alert>}
            <CommentView
                commentId={comment._id}
                text={text}
                author={comment.author}
                createdAt={comment.createdAt.toString()}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Comment;
