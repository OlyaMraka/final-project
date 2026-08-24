import { type FC, useState } from "react";
import CommentView from "./comment-view/comment-view.tsx";
import CommentEdit from "./comment-edit/comment-edit.tsx";
import {deleteComment, updateComment} from "../../../services/comment.service.ts";
import type {CommentComponentProps} from "../../../types/component-props/application-table.ts";

const Comment: FC<CommentComponentProps> = ({comment, author, onDeleted}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(comment.text);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setText(comment.text);
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
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (commentId: string) => {
        try {
            await deleteComment(commentId);

            onDeleted(commentId);
        } catch (error) {
            console.error(error);
        }
    };

    if (isEditing) {
        return (
            <CommentEdit commentId={comment._id} text={text} onSave={handleUpdate} onCancel={handleCancel}/>
        );
    }

    return (
        <CommentView
            commentId={comment._id}
            text={text}
            author={author}
            createdAt={comment.createdAt.toString()}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
};

export default Comment;
