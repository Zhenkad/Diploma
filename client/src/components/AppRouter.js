import React from 'react';
import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage';
import Registration from '../pages/Registration';
import Auth from '../pages/Auth';
import Admin from '../pages/Admin';


const AppRouter = () => {
    const isAuth = false 

    if (!isAuth){
        return (
            <Routes>
                <Route path = '/' element = {<MainPage />} />
                <Route path = '/registration' element = {<Registration />} />
                <Route path = '/Auth' element = {<Auth />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path = '/admin' element = {<Admin />}/>
        </Routes>
    );
};

export default AppRouter;