import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
  // Ensure proper handling of dynamic routes
  async rewrites() {
    return [
      {
        source: '/:userId/:slug/:path*',
        destination: '/api/:userId/:slug/:path*',
      },
    ];
  },
};

export default nextConfig;