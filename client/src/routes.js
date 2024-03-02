import Admin from './pages/Admin'
import MainPage from './pages/MainPage'
import Auth from './pages/Auth'
import Registration from './pages/Registration'
import { ADMIN_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE, REGISTRATION_ROUTE } from './utils/consts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export const publickRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },

    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]