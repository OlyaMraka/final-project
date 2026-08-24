import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { CommentFormProps } from "../../../types/component-props/application-table.ts";
import "./create-comment-form.css";

const CommentForm: FC<CommentFormProps> = ({ onCreate }) => {
    const {handleSubmit, register, reset, formState: { errors, isValid },} = useForm<{ text: string }>({
        mode: "all",
    });

    const submitHandler = async (formData: { text: string }) => {
        try {
            await onCreate(formData.text);
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="comment-form-container">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="comment-form"
            >
                <label>
                    Comment:

                    <textarea
                        {...register("text", {
                            required: "Comment is required",
                            validate: (value) =>
                                value.trim().length > 0 ||
                                "Comment cannot be empty",
                        })}
                    />

                    {errors.text && (
                        <div className="error-message">
                            {errors.text.message}
                        </div>
                    )}
                </label>

                <button
                    type="submit"
                    disabled={!isValid}
                >
                    Add comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
