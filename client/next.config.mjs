import 'dotenv/config';
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
  }
};

export default nextConfig;
