import React, { useContext, useState } from 'react'
import { Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { NavLink, useLocation } from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, RESETPASSWORD_ROUTE} from "../utils/consts";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { createStatForOneUser, createTokensForAllLevels } from '../http/levelAPI';
import { useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import 'react-international-phone/style.css';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (telephone_number) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(telephone_number));
    } catch (error) {
        return false;
    }
};

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [user_name, setUser_name] = useState('')
    const [password, setPassword] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const isValid = isPhoneValid(phone_number);

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(user_name, password)
            } else {
                data = await registration(user_name, phone_number, password)
                createStatForOneUser(data.id)
                createTokensForAllLevels(data.id)
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

                    <Form.Control {...register("userName", {
                        required: "Поле обязательно к заполнению",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Некорректный адрес электронной почты.",
                        },
                    }
                    )} className="mt-3" placeholder="Адрес электронной почты..." value={user_name} onChange={e => setUser_name(e.target.value)} />
                    <div>{errors?.userName && <p style={{ color: "red" }}>{errors?.userName?.message}</p>}</div>

                    {!isLogin &&
                        <div className="mt-3">
                            <PhoneInput inputStyle={{ width: "100%" }}
                                defaultCountry="ru"
                                value={phone_number}
                                onChange={(phone_number) => setPhoneNumber(phone_number)}
                            />
                            {!isValid && <div style={{ color: 'red' }}>Неверный номер телефона</div>}
                        </div>
                    }

                    <Form.Control {...register("password", {
                        required: "Поле обязательно к заполнению",
                    }
                    )} className="mt-3" placeholder="Пароль..." type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <div>{errors?.password && <p style={{ color: "red" }}>{errors?.password?.message}</p>}</div>

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
                        <NavLink className="align-self-end" to={RESETPASSWORD_ROUTE}>Забыли пароль?</NavLink>
                    </div>
                    <Button className="align-self-end w-100 my-3" onClick={handleSubmit(click)} variant={"outline-success"}>{isLogin ? 'Войти' : 'Регистрация'}</Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;