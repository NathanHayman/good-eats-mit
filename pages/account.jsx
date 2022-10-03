import React from 'react'
import { useSession, signOut, signIn, getSession } from 'next-auth/react'

export default function Account() {
    const { data: session, status } = useSession({required: true})

    if (status === 'loading') {
        return (
            <div>
                <p className="text-center">Loading...</p>
            </div>
        )
    } else if (status === 'unauthenticated') {
        return (
            <div>
                <p className="text-center">You are not signed in</p>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        )
    } else if (status === 'authenticated') {
        return (
            <div className='max-w-7xl mx-auto min-h-screen py-8 px-20'>
                <div className='flex justify-center items-center max-w-lg mx-auto'>
                    <h1 className="text-center text-4xl mb-8 font-bold">Your Account</h1>
                    <button onClick={() => signOut()} className='absolute bg-brand-1 px-4 py-1 rounded-lg text-white text-sm font-medium shadow-lg right-40'>Sign out</button>
                </div>
                <div className='flex justify-center items-center max-w-lg mx-auto'>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col items-center py-10 space-y-5'>
                            <img src={session.user.image} alt="user image" className='w-20 h-20 rounded-full'/>
                            <h4 className='text-center text-2xl font-bold'>{session.user.name}</h4>
                            <p className='text-center text-sm'>{session.user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}