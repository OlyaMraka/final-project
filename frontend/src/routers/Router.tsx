import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/main-layout/main-layout.tsx";
import SignInPage from "../pages/sign-in-page/sign-in-page.tsx";
import HomePage from "../pages/home-page/home-page.tsx";
import HomeLayout from "../layouts/home-layout/home-layout.tsx";
import AdminPage from "../pages/admin-page/admin-page.tsx";
import SetPasswordPage from "../pages/set-password-page/set-password-page.tsx";

export const router = createBrowserRouter([
    { path: '/', element: <MainLayout/>, children: [
            {index: true, element: <SignInPage/>},
            {path: "homepage", element: <HomeLayout/>, children: [
                    {index: true, element: <HomePage/>},
                ]},
            {path: "adminpage", element: <HomeLayout/>, children: [
                    {index: true, element: <AdminPage/>},
                ]},
            {path: "set-password", element: <SetPasswordPage/>},
        ] },
]);
