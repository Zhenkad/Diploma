import {ADMIN_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import MainPage from "./pages/MainPage";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]