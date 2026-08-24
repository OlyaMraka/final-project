import { type FC, useEffect, useState } from "react";
import type { ApplicationComment } from "../../../types/application-comment.ts";
import type { CommentAuthor } from "../../../types/component-props/application-table.ts";
import {
    createComment,
    getCommentsByApplicationId,
} from "../../../services/comment.service.ts";
import Comment from "../application-comment/application-comment.tsx";
import CommentForm from "../create-comment-form/create-comment-form.tsx";
import "./application-comment-container.css";
import {useAppSelector} from "../../../redux/hooks/useAppSelector.tsx";
import {setManager} from "../../../services/application.service.ts";
import {getApplicationFiltersFromSearchParams} from "../../../helpers/application-filters.helper.ts";
import {applicationSliceActions} from "../../../redux/slices/application-slice.ts";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../../redux/hooks/useAppDispatch.tsx";

type CommentsContainerProps = {
    applicationId: string;
    author: CommentAuthor;
};

const CommentsContainer: FC<CommentsContainerProps> = ({applicationId, author}) => {
    const [comments, setComments] = useState<ApplicationComment[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector(({ userSlice }) => userSlice);

    const isAuthor = !author.author_id || user?._id === author.author_id;

    useEffect(() => {
        const loadComments = async () => {
            try {
                setLoading(true);

                const data = await getCommentsByApplicationId(applicationId);

                setComments(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, [applicationId]);

    const handleDeleted = (commentId: string) => {
        setComments((prev) =>
            prev.filter((comment) => comment._id !== commentId)
        );
    };

    const handleCreate = async (text: string) => {
        try {
            const comment = await createComment(applicationId, text);

            if(!author.author_id) {
                await setManager(applicationId);

                const filters = getApplicationFiltersFromSearchParams(searchParams);

                dispatch(applicationSliceActions.getAllApplicationsWithFilters(filters));
            }

            setComments((prev) => [...prev, comment]);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div>Loading comments...</div>;
    }

    return (
        <div className="comments-container">
            {comments.map((comment) => (
                <Comment
                    key={comment._id}
                    comment={comment}
                    author={author}
                    onDeleted={handleDeleted}
                />
            ))}

            {isAuthor && <CommentForm onCreate={handleCreate}/>}
        </div>
    );
};

export default CommentsContainer;
