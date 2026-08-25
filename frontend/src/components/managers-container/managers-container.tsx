import type {FC} from "react";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {managerSliceActions} from "../../redux/slices/manager-slice.ts";
import ManagerCard from "../manager-card/manager-card.tsx";
import CustomPagination from "../pagination/custom-pagination.tsx";
import "./managers-container.css";

const ManagersContainer: FC = () => {
    const [searchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    const {managers, pageCount} = useAppSelector(
        ({managerSlice}) => managerSlice,
    );

    const page = Number(searchParams.get("page") ?? 1);

    useEffect(() => {
        dispatch(managerSliceActions.getAllManagersAction(page));
    }, [page, dispatch]);

    return (
        <div className="managers-container">
            <div className="managers-list">
                {managers?.map(manager => (
                    <ManagerCard
                        key={manager.manager._id}
                        managerInfo={manager}
                    />
                ))}
            </div>

            <CustomPagination pagesCount={pageCount ?? 0}/>
        </div>
    );
};

export default ManagersContainer;
