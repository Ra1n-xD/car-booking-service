import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID || '', // приколы TS
            clientSecret: process.env.GOOGLE_SECRET || '' // приколы TS
        })
    ]
});

export { handler as GET, handler as POST };
