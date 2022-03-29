import React, { useContext } from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap';

import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

const Header = () => {

    const { setAuth } = useContext(AuthContext);
    const { auth } = useAuth();

    const logout = async () => {

        setAuth({});

    }

    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="#home">Kamion <span>- Frontend Developer Assessment</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Güvenilir Kamyoncular</Nav.Link>
                    <Nav.Link href="/kamionadd">Kamyoncu Ekle</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                
                <Navbar.Text>
                    Hoşgeldin: <b>{ auth.username }</b>
                    <button className="btn btn-danger mb-1 logout" onClick={logout} size="sm">Çıkış Yap</button>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Header;