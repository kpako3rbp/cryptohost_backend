export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/news/:path*',
    '/categories/:path*',
    '/activities/:path*',
    '/promo-banners/:path*',
  ],
};
