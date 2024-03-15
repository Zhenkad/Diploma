import React from 'react'
import { Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Имя пользователя..." />
                    <Form.Control className="mt-3" placeholder="Пароль..." />
                    <div className="d-flex justify-content-between mt-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={'/registration'}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={'/login'}>Войдите!</NavLink>
                            </div>
                        }
                        <Button className=" align-self-end" variant={"outline-success"}>{isLogin ? 'Войти' : 'Регистрация'}</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;