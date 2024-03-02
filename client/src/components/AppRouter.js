import React from 'react';
import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage';
import Registration from '../pages/Registration';
import Auth from '../pages/Auth';


const AppRouter = () => {
    const isAuth = false

    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/Auth' element={<Auth />} />
        </Routes>
    );
};

export default AppRouter;