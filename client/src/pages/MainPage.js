import React, {useContext, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import LevelBar from '../components/LevelBar';
import {Context} from "../index";
import {fetchLevels} from "../http/levelAPI";
import {observer} from "mobx-react-lite";


const MainPage = observer(() => {
    const {level} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        fetchLevels(user._user.id).then(data => level.setLevels(data))
    }, [])

    return (
        <Container className="my-5">
            <LevelBar/>
        </Container>
    );
});

export default MainPage;