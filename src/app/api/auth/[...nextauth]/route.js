import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import connect from '@/utils/db';
import User from '@/models/User';

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            async authorize(credentials) {
                await connect();

                try {
                    const user = await User.findOne({ email: credentials.email });

                    if (user) {
                        const isPasswordCorrect = user.password === credentials.password;

                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error('Wrong password');
                        }
                    } else {
                        throw new Error('Wrong user');
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }
        })
    ],
    pages: { error: '/login' }
});

export { handler as GET, handler as POST };
