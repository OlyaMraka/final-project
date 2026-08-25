import type {FC} from "react";
import SetPasswordForm from "../../components/set-password-form/set-password-form.tsx";
import "./set-password-page.css";

const SetPasswordPage: FC = () => {
    return (
        <div className="set-password-page">
            <SetPasswordForm/>
        </div>
    );
};

export default SetPasswordPage;

