import React from 'react';
import {Routes , Route, Redirect} from "react-router-dom"
import { authRoutes } from '../routes';

const AppRouter = () => {
    const isAuth = false
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
        </Routes>
    );
};

export default AppRouter;