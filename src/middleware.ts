export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/orders', '/orders/:id*'],
    callbacks: {
        authorized({ req, token }: any) {
            if (token) return true; // If there is a token, the user is authenticated
        }
    }
};
