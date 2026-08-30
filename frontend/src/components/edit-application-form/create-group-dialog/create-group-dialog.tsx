import type {FC, SubmitEventHandler} from "react";
import { useState } from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks/useAppDispatch.tsx";
import { groupSliceActions } from "../../../redux/slices/group-slice.ts";

type CreateGroupDialogProps = {
    open: boolean;
    onClose: () => void;
};

const CreateGroupDialog: FC<CreateGroupDialogProps> = ({open, onClose}) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        setErrorMessage("");
        const groupName = name.trim();

        if (!groupName) {
            return;
        }

        try {
            setIsLoading(true);

            await dispatch(
                groupSliceActions.createGroupAction(groupName)
            ).unwrap();

            setName("");
            onClose();
        } catch (error) {
            setErrorMessage(error as string);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (isLoading) {
            return;
        }

        setName("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <DialogTitle>Create new group</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        required
                        margin="dense"
                        label="Group name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        error={!!errorMessage}
                        helperText={errorMessage}
                        disabled={isLoading}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!name.trim() || isLoading}
                    >
                        {isLoading ? "Creating..." : "Create"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateGroupDialog;