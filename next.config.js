/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'vignette.wikia.nocookie.net',
        port: '',
        pathname: '/**',
      }],
  }
};

export default nextConfig;
