/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    allowedDevOrigins: ['*.replit.dev', '*.repl.co'],
  },
};

export default nextConfig;
