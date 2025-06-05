/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true, // Log full URLs for fetch requests
    },
  },
  images: {
    domains: ['shopping-phinf.pstatic.net'],
  },
};

export default nextConfig;
