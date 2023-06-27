'use client';
import { AuthWrapper } from './components/AuthWrapper';
import { NextAuthProvider } from './components/Providers';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <head>
                <title>E-commerce Admin</title>
            </head>
            <body>
                <NextAuthProvider>
                    <div className='bg-blue-900 min-h-screen flex'>
                        <AuthWrapper>{children}</AuthWrapper>
                    </div>
                </NextAuthProvider>
            </body>
        </html>
    );
}
