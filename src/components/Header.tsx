'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Nav } from 'react-bootstrap';

import logo from '../../public/logo.png';

function Header() {
    return (
        <header>
            <Navbar bg="light" expand="md">
                <div className="container col-lg-8 col-sm-12">
                    <Navbar.Brand className="logo justify-content-end">
                        <Image src={logo} width={55} height={55} alt="logo" />
                        <h2>Абобус-Моторс </h2>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="navigation">
                            <Link href="/">Оставить заявку</Link>
                            <Link href="/order">Список заявок</Link>
                            <Link href="/ready">Ready</Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    );
}

export default Header;
