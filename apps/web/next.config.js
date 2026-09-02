/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@bm/shared'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
