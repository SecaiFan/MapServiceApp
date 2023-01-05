import {
    ACTIVATION_ROUTE,
    INSTITUTION_ADDING_ROUTE,
    INSTITUTION_MANAGING_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, MAP_ROUTE,
    REGISTRATION_ROUTE
} from './utils/constants'
import serviceOwnerPanel from './pages/serviceOwnerPanel';
import Activation from './pages/Activation'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Map from './pages/Map'


export const authRoutes  = [
    {
        path: ACTIVATION_ROUTE,
        Component: Activation
    },
    {
        path: INSTITUTION_ADDING_ROUTE,
        Component: serviceOwnerPanel
    },
    {
        path: INSTITUTION_MANAGING_ROUTE,
        Component: serviceOwnerPanel
    },
    {
        path: LOGOUT_ROUTE,
        Component: Logout
    },

];
export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: MAP_ROUTE,
        Component: Map
    },
];