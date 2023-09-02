import type { Metadata } from 'next';
import { Providers } from './redux/provider';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AuthProvider from '@/components/AuthProvider';

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
    title: 'Абобус-Моторс',
    description: 'Бронирование автомобилей'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Providers>
                        <div className="wrapper">
                            <Header />
                            <main className="container">{children}</main>
                            <Footer />
                        </div>
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    );
}
