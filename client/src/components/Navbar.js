import React, { useContext } from 'react';
import {Container} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
import {ADMIN_ROUTE, LOGIN_ROUTE} from '../utils/consts';
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)

    }
    return (
        <Navbar className="navbar navbar-dark bg-dark">
            <Container>
                <Navbar.Brand href="/">Кибер полигон</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {user.isAuth ?
                        <Nav>
                            <Button variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>Панель администратора</Button>
                            <Button variant={"outline-light"} style={{marginLeft: "10px"}} onClick={() => logOut()}>Выйти</Button>
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