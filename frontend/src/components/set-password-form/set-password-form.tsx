import {type FC, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {SetPasswordValidator} from "../../validators/set-password-validator.ts";
import type {SetPasswordFormData} from "../../types/component-props/set-password.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {setPassword} from "../../services/auth.service.ts";
import "./set-password-form.css";

const SetPasswordForm: FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [serverError, setServerError] = useState("");

    const activationToken = searchParams.get("token") ?? "";

    const submitHandler = async (formData: SetPasswordFormData,) => {
        try {
            await setPassword(activationToken, formData.password);

            navigate("/");
        } catch (error) {
            setServerError(
                error.response?.data?.message ??
                "Something went wrong"
            );

            reset();
        }
    };

    const { handleSubmit, register, formState: {errors, isValid}, reset } = useForm<SetPasswordFormData>({
        mode: "onChange",
        resolver: joiResolver(SetPasswordValidator)
    });

    return (
        <div className="set-password-form-container">
            <h1>Set Password</h1>
            <form className="set-password-form" onSubmit={handleSubmit(submitHandler)}>
                <label>
                    Password:
                    <input type="password" {...register("password")}/>
                    { errors.password && <div className="error-message">{errors.password.message}</div> }
                </label>

                <label>
                    Confirm password:
                    <input type="password" {...register("confirmPassword")}/>
                    { errors.confirmPassword && <div className="error-message">{errors.confirmPassword.message}</div> }
                </label>

                <button disabled={!isValid}>Save</button>
            </form>
            {serverError && (
                <div className="error-message">
                    {serverError}
                </div>
            )}
        </div>
    );
};

export default SetPasswordForm;
