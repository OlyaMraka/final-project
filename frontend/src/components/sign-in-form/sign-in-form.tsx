import type {FC} from "react";
import {useForm} from "react-hook-form";
import type {SignInFormProps} from "../../types/sign-in-form.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {SignInValidator} from "../../validators/sign-in.validator.ts";
import "./sign-in-form.css";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {userSliceActions} from "../../redux/slices/user-slice.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";

const SignInFormComponent: FC = () => {
    const { handleSubmit, register, formState: {errors, isValid} } = useForm<SignInFormProps>({
        mode: "all",
        resolver: joiResolver(SignInValidator)
    });

    const dispatch = useAppDispatch();
    const {error} = useAppSelector(({userSlice}) => userSlice);
    const navigate = useNavigate();

    const submitHandler = async (formData: SignInFormProps) => {
        try {
            await dispatch(userSliceActions.signIn(formData)).unwrap();

            navigate("/homepage");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="log-in-form-container">
            <h1>Welcome to my CRM system</h1>
            <h3>Sign in</h3>
            <form onSubmit={handleSubmit(submitHandler)} className="form-block">
                <label>
                    Email:
                    <input type="email" {...register("email")}/>
                    { errors.email && <div className="error-message">{errors.email.message}</div> }
                </label>

                <label>
                    Password:
                    <input type="password" {...register("password")}/>
                    { errors.password && <div className="error-message">{errors.password.message}</div> }
                </label>

                <button disabled={!isValid}>Save</button>
            </form>

            {
                error && (
                    <div className="error-info">{error}</div>
                )
            }
        </div>
    );
};

export default SignInFormComponent;
