export { default } from 'next-auth/middleware';

export const config = { matcher: ['/orders', '/orders/:id*'] };