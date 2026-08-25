import {type FC, useEffect} from "react";
import Header from "../../components/header/header.tsx";
import {Outlet} from "react-router-dom";
import "./home-layout.css";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {userSliceActions} from "../../redux/slices/user-slice.ts";

const HomeLayout: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userSliceActions.me());
    }, []);

    return (
        <div className="home-layout-block">
            <Header/>
            <Outlet/>
        </div>
    );
};

export default HomeLayout;
