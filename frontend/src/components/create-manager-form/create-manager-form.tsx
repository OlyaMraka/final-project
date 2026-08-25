import {type FC} from "react";
import type {CreateManagerDto} from "../../types/user.ts";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {ManagerValidator} from "../../validators/manager-validator.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {managerSliceActions} from "../../redux/slices/manager-slice.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import "./create-manager-form.css";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type {CreateManagerFormProps} from "../../types/component-props/create-manager-form.ts";

const CreateManagerForm: FC<CreateManagerFormProps> = ({onClose}) => {
    const dispatch = useAppDispatch();

    const { handleSubmit, register, formState: {errors, isValid} } = useForm<CreateManagerDto>({
        mode: "onChange",
        resolver: joiResolver(ManagerValidator)
    });

    const {page} = useAppSelector(
        ({managerSlice}) => managerSlice,
    );

    const submitHandler = async (formData: CreateManagerDto) => {
        await dispatch(
            managerSliceActions.createManagerAction(formData)
        ).unwrap();

        await dispatch(
            managerSliceActions.getAllManagersAction(page)
        ).unwrap();

        onClose();
    };

    return (
        <div className="create-manager-form-block">
            <div className="create-manager-form-header">
                <h2>Create Manager</h2>
                <IconButton size="small" onClick={onClose} aria-label="save comment">
                    <CloseIcon/>
                </IconButton>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className="create-manager-form">
                <label>
                    Name:
                    <input type="text" {...register("name")}/>
                    { errors.name && <div className="error-message">{errors.name.message}</div> }
                </label>

                <label>
                    Surname:
                    <input type="text" {...register("surname")}/>
                    { errors.surname && <div className="error-message">{errors.surname.message}</div> }
                </label>

                <label>
                    Email:
                    <input type="email" {...register("email")}/>
                    { errors.email && <div className="error-message">{errors.email.message}</div> }
                </label>

                <button disabled={!isValid}>Create</button>
            </form>
        </div>
    );
};

export default CreateManagerForm;
