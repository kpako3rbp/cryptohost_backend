import Nextauth from 'next-auth';
import type { Admin } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: Admin & { token: 'string' };
  }
}
