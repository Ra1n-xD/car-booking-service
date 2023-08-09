import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../app/logo.png';

const Header = () => {
    return (
        <header className="">
            <div className="d-flex justify-content-between">
                <Image src={logo} width={55} height={55} alt="logo" />
                <h1>Название Фирмы</h1>
            </div>
            <nav className="navigation">
                <Link href="/">Оставить заявку</Link>
                <Link href="/services">Сгенерированная заявка</Link>
                <Link href="/about">Список заявок</Link>
            </nav>
        </header>
    );
};

export default Header;
