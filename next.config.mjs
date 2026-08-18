/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow external images (for proof photos, map tiles, etc.)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },

  // Suppress hydration warnings from theme attribute set before React hydrates
  reactStrictMode: true,

  // Allow importing from the Frontend/ directory
  transpilePackages: [],

  // Security headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Payment' },
        ],
      },
    ];
  },
};

export default nextConfig;
