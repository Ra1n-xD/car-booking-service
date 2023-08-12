import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './redux/provider';

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
    title: 'Абоба-Моторс',
    description: 'Бронирование автомобилей'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="wrapper">
                        <Header />
                        <main className="container">{children}</main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
