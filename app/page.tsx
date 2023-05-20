'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Nav from './components/Nav';

export default function Home() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className='bg-blue-900 w-screen h-screen flex items-center'>
                <div className='text-center w-full'>
                    <button
                        className='bg-white p-2 rounded-lg px-4'
                        onClick={() => signIn('google')}
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Nav />
            <div className='bg-white flex-grow mt-2 mr-2 rounded-lg mb-2'>
                logged in {session.user?.email}
            </div>
        </>
    );
}
