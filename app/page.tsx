'use client';
import { useSession } from 'next-auth/react';
import Nav from './components/Nav';
import Image from 'next/image';

export default function Home() {
    const { data: session } = useSession();

    return (
        <>
            <Nav />
            <div className=' flex-grow p-4'>
                <div className='text-blue-900 flex justify-between'>
                    <h2>
                        Hello, <b>{session?.user?.name}</b>
                    </h2>
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
