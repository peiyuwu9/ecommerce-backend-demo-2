/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ec4b1e59f23f41bbbda9e5ecfd2a4a3d.r2.dev',
      },
    ],
  },
};

module.exports = nextConfig;
