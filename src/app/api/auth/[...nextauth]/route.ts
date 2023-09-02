import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import connect from '@/utils/db';
import User from '@/models/User';

const authConfig: AuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email', required: true },
                password: { label: 'Пароль', type: 'password', required: true }
            },
            async authorize(credentials) {
                await connect();

                try {
                    const user = await User.findOne({ email: credentials?.email });
                    if (!user) throw new Error('User is not found');

                    const isPasswordCorrect = user.password === credentials?.password;
                    if (!isPasswordCorrect) throw new Error('Wrong password');

                    return user;
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    pages: { signIn: '/login' }
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
