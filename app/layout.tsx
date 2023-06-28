'use client';
import { createContext, useState } from 'react';
import { AuthWrapper } from './components/AuthWrapper';
import { NextAuthProvider } from './components/Providers';
import './globals.css';
import Logo from './components/Logo';

export const ShowNavContext = createContext<{
    showNav: boolean;
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}>({ showNav: false, setShowNav: () => {} });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showNav, setShowNav] = useState(false);

    return (
        <html lang='en'>
            <head>
                <title>E-commerce Admin</title>
            </head>
            <body>
                <NextAuthProvider>
                    <div className='bg-gray-100 min-h-screen'>
                        <div className='md:hidden flex items-center p-4'>
                            <button onClick={() => setShowNav(!showNav)}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                                    />
                                </svg>
                            </button>
                            <div className='flex grow justify-center mr-6'>
                                <Logo />
                            </div>
                        </div>
                        <div className='flex '>
                            <ShowNavContext.Provider
                                value={{ showNav, setShowNav }}
                            >
                                <AuthWrapper>{children}</AuthWrapper>
                            </ShowNavContext.Provider>
                        </div>
                    </div>
                </NextAuthProvider>
            </body>
        </html>
    );
}
