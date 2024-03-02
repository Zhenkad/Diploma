import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage';
import Registration from '../pages/Registration';
import Auth from '../pages/Auth';
import Admin from '../pages/Admin';
import { Context } from "../index";


const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user)
    if (!user.isAuth){
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