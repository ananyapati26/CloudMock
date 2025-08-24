import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Handle Prisma client externalization
  serverExternalPackages: ['@prisma/client', 'prisma'],
  
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
  
  
};

export default nextConfig;