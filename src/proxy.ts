import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const proxyHandler = createMiddleware(routing);

export default proxyHandler;

export const config = {
  matcher: [
    '/', 
    '/(ru|en)/:path*', 
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
