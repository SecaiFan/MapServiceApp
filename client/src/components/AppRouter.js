import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {MAP_ROUTE, REGISTRATION_ROUTE} from "../utils/constants";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    console.log(user);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path='*' element={<Navigate to={MAP_ROUTE} replace/>}/>
        </Routes>
    );
};

export default AppRouter;