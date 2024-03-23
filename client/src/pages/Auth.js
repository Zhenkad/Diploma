import React, {useContext, useState} from 'react'
import { Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {NavLink, useLocation} from 'react-router-dom';
import {REGISTRATION_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { createTokens } from '../http/levelAPI';



const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [user_name, setUser_name] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try{
            let data;
            if (isLogin) {
                data = await login(user_name, password)
            } else {
                data = await registration(user_name, password)
                createTokens(data.id)
            }
            user.setUser(data)
            user.setIsAuth(true)
            window.location.replace('/')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Имя пользователя..." value={user_name} onChange={e => setUser_name(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Пароль..." type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <div className="d-flex justify-content-between mt-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button className="align-self-end" onClick={click} variant={"outline-success"}>{isLogin ? 'Войти' : 'Регистрация'}</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;