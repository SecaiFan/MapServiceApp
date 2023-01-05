import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import {
    ACTIVATION_ROUTE, INSTITUTION_ADDING_ROUTE,
    LOGIN_ROUTE,
    LOGOUT_ROUTE,
    MAP_ROUTE,
    REGISTRATION_ROUTE
} from "../utils/constants";
import {observer} from "mobx-react-lite";

const NavBar = observer( () => {
    const {user} = useContext(Context);
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>GetTheMap</Navbar.Brand>
                {user.isAuth ?
                    <Nav className="ms-auto">
                        <Nav.Link href={MAP_ROUTE}>Карта</Nav.Link>
                        <Nav.Link href={INSTITUTION_ADDING_ROUTE}>Добавить заведение</Nav.Link>
                        <Nav.Link href={LOGOUT_ROUTE}>Выйти</Nav.Link>
                        <Nav.Link href={ACTIVATION_ROUTE}>Активировать аккаунт</Nav.Link>
                    </Nav>
                :
                    <Nav className="ms-auto">
                        <Nav.Link href={MAP_ROUTE}>Карта</Nav.Link>
                        <Nav.Link href={REGISTRATION_ROUTE}>Регистрация</Nav.Link>
                        <Nav.Link href={LOGIN_ROUTE}>Вход</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;