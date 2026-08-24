/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@bm/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
