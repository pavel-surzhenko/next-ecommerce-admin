'use client';
import { useSession, signIn } from 'next-auth/react';
import Nav from './components/Nav';
import Image from 'next/image';

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
            <div className='bg-white flex-grow mt-2 mr-2 rounded-lg mb-2 p-2'>
                <div className='text-blue-900 flex justify-between'>
                    <h2>Hello, <b>{session?.user?.name}</b></h2>
                    <div className='flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden'>
                        <Image
                            src={session?.user?.image || '/'}
                            alt='avatar'
                            width={24}
                            height={24}
                        />
                        <span className='px-2'>{session?.user?.name}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
