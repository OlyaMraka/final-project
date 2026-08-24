import type { FC } from "react";
import type { ApplicationDetailsProps } from "../../../types/component-props/application-table.ts";
import CommentsContainer from "../application-comment-container/application-comment-container.tsx";
import "./application-details.css";

const ApplicationDetails: FC<ApplicationDetailsProps> = ({applicationId, message, utm, author}) => {
    return (
        <div className="application-details-block">
            <div className="application-details-info">
                <div>
                    <span>Message</span>
                    <p>{message || "No message"}</p>
                </div>

                <div>
                    <span>UTM</span>
                    <p>{utm || "No UTM"}</p>
                </div>
            </div>

            <div className="application-details-comments">
                <CommentsContainer
                    applicationId={applicationId}
                    author={author}
                />
            </div>
        </div>
    );
};

export default ApplicationDetails;
