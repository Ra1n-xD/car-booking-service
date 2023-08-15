'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Nav, Button } from 'react-bootstrap';

import logo from '../../public/logo.png';

function Header() {
    return (
        <header>
            <Navbar bg="light" expand="lg">
                <div className="container col-lg-10 col-sm-12">
                    <Navbar.Brand className="offset d-flex align-items-center">
                        <Image src={logo} width={60} height={60} alt="logo" />
                        <h2>Абобус-Моторс </h2>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="navigation">
                            <Link href="/">Оставить заявку</Link>
                            <Link href="/orders">Список заявок</Link>
                            <Link href="/ready">Ready</Link>
                            <Button variant="primary">Авторизация</Button>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <div className="bottom-bar"></div>
        </header>
    );
}

export default Header;
