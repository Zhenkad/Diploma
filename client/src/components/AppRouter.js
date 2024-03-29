import React, {useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {Context} from "../index";
import {authRoutes, publicRoutes} from "../rotes";
import {LOGIN_ROUTE} from "../utils/consts";


const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={LOGIN_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;