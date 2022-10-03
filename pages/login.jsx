import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const login = () => {
    const { data: session, status } = useSession()

    if (session) {
        return(
            // after login, redirect to home page
            <div>
                <p className="text-center">Welcome, {session.user.name}</p>
                <img src={session.user.image} alt="user image" />
                <Link href="/">Go to home page</Link>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    } else {
        return(
            <div>
                <p className="text-center">You are not signed in</p>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        )
    }
}

export default login;