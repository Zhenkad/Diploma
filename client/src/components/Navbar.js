import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useHistory } from "react-router-dom";
import { IoLogOutSharp } from "react-icons/io5";

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
        history.push(LOGIN_ROUTE)
    }

    return (
        <Navbar className="navbar navbar-dark bg-dark">
            <Container>
                <Navbar.Brand href="/">Кибер полигон</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {user.isAuth && user._user.role === 'ADMIN' ?
                        <Nav>
                            <Button variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>Панель администратора</Button>
                            <Button variant={"outline-light"} style={{ marginLeft: "10px" }} onClick={() => logOut()}>{user._user.user_name} <IoLogOutSharp />
</Button>
                        </Nav>
                        :
                        user.isAuth && user._user.role === 'USER' ?
                            <Nav>
                                <Button variant={"outline-light"} style={{ marginLeft: "10px" }} onClick={() => logOut()}><IoLogOutSharp /></Button>
                            </Nav>
                            :
                            <Nav>
                                <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;