/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "assets.mixkit.co",
      },
    ],
  },
};

export default nextConfig;
