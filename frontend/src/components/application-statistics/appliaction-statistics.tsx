import {type FC, useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {applicationStatisticsActions} from "../../redux/slices/application-statistics-slice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import "./application-statistics.css";

const ApplicationStatistics: FC = () => {
    const { statistics } = useAppSelector(({applicationStatisticsSlice}) => applicationStatisticsSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(applicationStatisticsActions.getApplicationStatisticsAction());
    }, []);

    return (
        <div className="admin-panel-header-section">
            <h1>Application Statistics</h1>
            <div className="statistics-container">
                <div>
                    {
                        statistics && statistics.statusStatistics.map(info => (
                            <div className="status-info-block">
                                <span>{info.status}: {info.applicationCount}</span>
                            </div>
                        ))
                    }
                </div>

                <button className="create-manager-button">Create manager</button>
            </div>
        </div>
    );
};

export default ApplicationStatistics;
