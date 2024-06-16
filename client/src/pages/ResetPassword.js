import { observer } from "mobx-react-lite";
import React, {useState} from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { resetPasswordRequest } from "../http/userApi";
import { LOGIN_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";

const ResetPassword = observer(() => {
    const [userName, setUserName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [errorMessage, setMessage] = useState('')

    const resetPassword = async () => {
        try{
            if (newPassword !== confirmPassword) {
                setMessage("Пароли не совпадают")
                return
            }
            await resetPasswordRequest(userName, newPassword)
            setMessage('')
            setSuccess(true)
            setTimeout(() => window.location.replace(LOGIN_ROUTE), 1000)
        } catch (e) {
            setMessage(e.response.data.message)
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
                    {errorMessage && <Alert className="mt-2 mb-0 p-2 text-center" variant={"danger"}>{errorMessage}</Alert>}
                    {success && <Alert className="mt-2 mb-0 p-2 text-center" variant={"success"}>Пароль изменен</Alert>}
                    <NavLink className="mt-1" to={LOGIN_ROUTE}>Вернуться на страницу авторизации</NavLink>
                    <Button className="mt-3 align-self-end w-100" variant={"outline-success"} onClick={() => resetPassword()}>Изменить пароль</Button>
                </Form>
            </Card>
        </Container>
    );
});

export default ResetPassword;