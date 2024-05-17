import { Container, Tab, Tabs } from "react-bootstrap";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import CreateLevel from "../components/Modal/CreateLevel";
import UserBar from "../components/UserBar";
import AdminLevelBar from "../components/AdminLevelBar";

const Admin = () => {
    const [levelVisible, setLevelVisible] = useState(false)
    return (
        <Container className='my-4'>
            <h2 className="my-3 text-center">Панель администратора</h2>
            <Tabs
                defaultActiveKey="Users"
                id="controller"
                className="mb-3">
                <Tab eventKey="Users" title="Пользователи">
                    <UserBar />
                </Tab>
                <Tab eventKey="Levels" title="Задания">
                    <AdminLevelBar />
                    <Button variant={"outline-dark"} className="mb-3" onClick={() => setLevelVisible(true)}>Добавить задание</Button>
                    <CreateLevel show={levelVisible} onHide={() => setLevelVisible(false)} />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Admin;