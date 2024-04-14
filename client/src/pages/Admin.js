import {Container} from "react-bootstrap";
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import CreateLevel from "../components/Modal/CreateLevel";
import UserBar from "../components/UserBar";

const Admin = () => {
    const [levelVisible, setLevelVisible] = useState(false)
    return (
        <Container className='my-4'>
            <Button variant={"outline-dark"} className="mb-3" onClick={() => setLevelVisible(true)}>Добавить испытание</Button>
            <CreateLevel show={levelVisible} onHide={() => setLevelVisible(false)}/>
            <UserBar/>
        </Container>
    );
};

export default Admin;