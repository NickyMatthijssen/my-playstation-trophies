/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "psnobj.prod.dl.playstation.net",
      },
    ],
  },
};

module.exports = nextConfig;
