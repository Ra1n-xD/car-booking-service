'use client';
import { useState } from 'react';
import { Navbar as NavbarBS, Offcanvas, Nav, Button } from 'react-bootstrap';

import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import logo from '../../public/logo.png';
import Loading from './Loading';

const Navbar = () => {
    const session = useSession();
    const authorized = session.status === 'authenticated';
    const isLoading = session.status === 'loading';

    const [showMenu, setShowMenu] = useState(false);

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    const handleAuth = () => {
        if (authorized) {
            signOut({ callbackUrl: '/login' });
        }
        setShowMenu(false);
    };

    return (
        <>
            <NavbarBS expand="lg" className="container col-11 col-lg-9">
                <Link href="/" className="link-underline link-underline-opacity-0">
                    <NavbarBS.Brand className="offset d-flex align-items-center">
                        <Image src={logo} width={70} height={70} alt="logo" />

                        <div className="d-flex flex-column">
                            <p className="display-6">Абобус-Моторс </p>
                            <span className="lead d-none d-lg-block">Бронирование авто</span>
                        </div>
                    </NavbarBS.Brand>
                </Link>

                <NavbarBS.Toggle aria-controls="basic-NavbarBS-nav" onClick={handleMenuToggle} />
                <NavbarBS.Offcanvas id="basic-NavbarBS-nav" show={showMenu} onHide={handleMenuClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="basic-NavbarBS-nav">Меню</Offcanvas.Title>
                    </Offcanvas.Header>
                    <div className="separator"></div>

                    <Offcanvas.Body>
                        <Nav className="navigation justify-content-end flex-grow-1">
                            {authorized && (
                                <>
                                    <Link href="/" className="navigation-item" onClick={handleMenuClose}>
                                        Оставить заявку
                                    </Link>
                                    <Link href="/orders" className="navigation-item" onClick={handleMenuClose}>
                                        Мои заявки
                                    </Link>
                                </>
                            )}

                            {!isLoading ? (
                                <Link href="/login" className="navigation-item" onClick={handleAuth}>
                                    <Button variant="outline-primary">{authorized ? `Выйти` : `Войти`}</Button>
                                </Link>
                            ) : (
                                <Loading />
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </NavbarBS.Offcanvas>
            </NavbarBS>
        </>
    );
};

export default Navbar;
