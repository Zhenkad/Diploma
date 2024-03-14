import React from 'react'
import { Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Auth = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Имя пользователя..."/>
                    <Form.Control className="mt-3" placeholder="Пароль..."/>
                </Form>
                <Button className="mt-3 align-self-end" variant={"outline-success"}>Войти</Button>
            </Card>
        </Container>
    );
};

export default Auth;