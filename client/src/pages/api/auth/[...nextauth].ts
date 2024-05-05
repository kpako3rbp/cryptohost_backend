import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import routes, { baseUrl } from '../../../../routes';
import axios from 'axios';
import type { Admin } from '@prisma/client';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession } from 'next-auth';

type User = Admin & {
  token: string;
};

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        login: { label: 'Login', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(routes.adminLogin(), {
            login: credentials?.login,
            password: credentials?.password,
          });

          // console.log('res', res);

          const user = res.data;

          if (!user) {
            //throw new Error('Неверный логин или пароль');
            console.error('Неверный логин или пароль');
            return null;
          }

          return user;
        } catch (error) {
          throw new Error(`Неверный логин или пароль`);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log('token', token);
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('url:', url);

      // Allows relative callback URLs
      if (url.startsWith('/')) {
        console.log('Redirecting to:', `${baseUrl}${url}`);
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        console.log('Redirecting to:', url);
        return url;
      }
      console.log('Redirecting to baseUrl:', baseUrl);
      return baseUrl;
    },
  },
};

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export default NextAuth(authOptions);
