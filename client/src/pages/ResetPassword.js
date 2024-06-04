import { observer } from "mobx-react-lite";
import React, {useState} from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { resetPasswordRequest } from "../http/userApi";
import { LOGIN_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";

const ResetPassword = observer(() => {
    const [userName, setUserName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const resetPassword = () => {
        try{
            if (newPassword !== confirmPassword) {
                alert("Пароли не совпадают")
                return
            }
            resetPasswordRequest(userName, newPassword)
            alert("Пароль успешно изменен")
            window.location.replace(LOGIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Восстановление пароля</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Введите адрес электронной почты..." value={userName} onChange={e => setUserName(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Новый пароль..." type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Подтвердите пароль..." type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <NavLink className="mt-3" to={LOGIN_ROUTE}>Вернуться на страницу авторизации</NavLink>
                    <Button className="mt-3 align-self-end w-100" variant={"outline-success"} onClick={() => resetPassword()}>Изменить пароль</Button>
                </Form>
            </Card>
        </Container>
    );
});

export default ResetPassword;