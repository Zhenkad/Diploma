import React from 'react';
import {Container} from 'react-bootstrap';
import LevelBar from '../components/LevelBar';


const MainPage = () => {
    return (
        <Container className="my-5">
            <LevelBar/>
        </Container>
    );
};

export default MainPage;