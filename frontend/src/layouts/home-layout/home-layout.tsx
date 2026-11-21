import {type FC, useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import "./home-layout.css";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {userSliceActions} from "../../redux/slices/user-slice.ts";
import {getItemFromLocalStorage} from "../../services/helpers.ts";
import type {Token, User} from "../../types/user.ts";
import {RoleName} from "../../enums/role-name.enum.ts";

const HomeLayout: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const checkAccess = async () => {
            let token: Token;
            try {
                token = getItemFromLocalStorage<Token>("token");
            } catch {
                localStorage.removeItem("token");
                navigate("/", {replace: true});
                return;
            }

            if (!token?.access_token || !token?.refresh_token) {
                navigate("/", {replace: true});
                return;
            }

            try {
                const user = await dispatch(userSliceActions.me()).unwrap() as User;
                if (!isMounted) return;

                if (location.pathname.startsWith("/adminpage") && user.role !== RoleName.ADMIN) {
                    navigate("/homepage", {
                        replace: true,
                        state: {accessDenied: true},
                    });
                    return;
                }

                setIsAuthorized(true);
            } catch {
                if (!isMounted) return;
                localStorage.removeItem("token");
                navigate("/", {replace: true});
            } finally {
                if (isMounted) setIsChecking(false);
            }
        };

        void checkAccess();
        return () => { isMounted = false; };
    }, [dispatch, location.pathname, navigate]);

    if (isChecking || !isAuthorized) {
        return null;
    }

    return (
        <div className="home-layout-block">
            <Header/>
            <Outlet/>
        </div>
    );
};

export default HomeLayout;
