import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    // callbacks: {
    //     session({ session, token, user }) {
    //         return session
    //     }
    // },
    // adapter: MongoDBAdapter(clientPromise),
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }