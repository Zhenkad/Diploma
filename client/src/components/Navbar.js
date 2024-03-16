import React, { useContext } from 'react';
import {Container} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
import {ADMIN_ROUTE, LOGIN_ROUTE} from '../utils/consts';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    return (
        <Navbar className="navbar navbar-dark bg-dark">
            <Container>
                <Navbar.Brand href="/">Кибер полигон</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {user.isAuth ?
                        <Nav>
                            <Button variant={"outline-light"} href={ADMIN_ROUTE}>Панель администратора</Button>
                            <Button variant={"outline-light"} style={{marginLeft: "10px"}}>Выйти</Button>
                        </Nav>
                        :
                        <Nav>
                            <Button variant={"outline-light"} href={LOGIN_ROUTE}>Авторизация</Button>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;