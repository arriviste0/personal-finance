import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push({
      'mongodb-client-encryption': 'mongodb-client-encryption',
      'kerberos': 'kerberos',
      'aws4': 'aws4',
      'tls': 'tls',
      'net': 'net',
      'dns': 'dns',
    });

    return config;
  }
};

export default nextConfig;
