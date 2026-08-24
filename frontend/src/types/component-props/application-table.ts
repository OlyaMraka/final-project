import type {IApplicationResponse} from "../application.ts";
import type {ApplicationComment} from "../application-comment.ts";

export type ApplicationsTableProps = {
    applications: IApplicationResponse[];
};

export type ApplicationRowProps = {
    application: IApplicationResponse;
    onEdit: (application: IApplicationResponse) => void;
};

export type ApplicationDetailsProps = {
    applicationId: string;
    message: string;
    utm: string;
    author: CommentAuthor;
}

export type CommentAuthor = {
    author_id: string;
    author_name: string;
    author_surname: string;
}

export type CommentEditProps = {
    commentId: string;
    text: string;
    onSave: (commentId: string, text: string) => void;
    onCancel: () => void;
};

export type CommentViewProps = {
    commentId: string;
    text: string;
    author: CommentAuthor
    createdAt: string;
    onEdit: () => void;
    onDelete: (commentId: string) => void;
};

export type CommentComponentProps = {
    comment: ApplicationComment;
    author: CommentAuthor;
    onDeleted: (commentId: string) => void;
};

export type CommentFormProps = {
    onCreate: (text: string) => Promise<void>;
};
