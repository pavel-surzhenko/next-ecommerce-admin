import { signIn, useSession } from 'next-auth/react';
import { SpinnerLogIn } from './Spinner';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className='w-screen h-screen flex items-center justify-center'>
                <SpinnerLogIn />
            </div>
        );
    }

    if (!session) {
        return (
            <div className='bg-gray-100 w-screen h-screen flex items-center'>
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

    return <>{children}</>;
}
