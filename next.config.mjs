/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/next-mongo',
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
