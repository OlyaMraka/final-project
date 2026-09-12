export type ApplicationComment = {
    _id: string;
    text: string;
    applicationId: string;
    author: CommentOwner;
    createdAt: Date;
}

export type CommentOwner = {
    _id: string;
    name: string;
    surname: string;
}