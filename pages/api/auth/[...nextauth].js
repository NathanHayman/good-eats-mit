import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'



export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    // A database is optional, but required to persist accounts in a database
})