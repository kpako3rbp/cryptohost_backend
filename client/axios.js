import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './src/pages/api/auth/[...nextauth].ts';

const instance = axios.create({
  // baseURL: process.env.API_URL,
});

instance.interceptors.request.use(async (config) => {
  const session = await getServerSession(authOptions);
  if (session && session.user.token) {
    config.headers.Authorization = `Bearer ${session.user.token}`;
  }

  return config;
});

export default instance;
