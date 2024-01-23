/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'en',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        pathname: '**',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx'],
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = withPWA(nextConfig);
