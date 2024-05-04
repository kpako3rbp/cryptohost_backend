/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    SERVER_URL: process.env.API_URL,
    CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
  }
};

export default nextConfig;
