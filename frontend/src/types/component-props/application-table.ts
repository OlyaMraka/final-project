import type {IApplicationResponse} from "../application.ts";
import type {ApplicationComment, CommentOwner} from "../application-comment.ts";

export type ApplicationsTableProps = {
    applications: IApplicationResponse[];
};

export type ApplicationRowProps = {
    application: IApplicationResponse;
    onEdit: (application: IApplicationResponse) => void;
    isOpen: boolean;
    onExpand: () => void;
};

export type ApplicationDetailsProps = {
    applicationId: string;
    message: string;
    utm: string;
    author: ApplicationAuthor;
}

export type ApplicationAuthor = {
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
    author: CommentOwner
    createdAt: string;
    onEdit: () => void;
    onDelete: (commentId: string) => void;
};

export type CommentComponentProps = {
    comment: ApplicationComment;
    onDeleted: (commentId: string) => void;
};

export type CommentFormProps = {
    onCreate: (text: string) => Promise<void>;
};
