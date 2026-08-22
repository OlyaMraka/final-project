import type {FC} from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form.tsx";
import "./sign-in-page.css";

const SignInPage: FC = () => {
    return (
        <div className="sign-in-page-block">
            <SignInForm/>
        </div>
    );
};

export default SignInPage;
