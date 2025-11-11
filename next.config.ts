import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'balanceconference.ba',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'findyourbalance.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
