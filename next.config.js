/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "psnobj.prod.dl.playstation.net",
      },
    ],
  },
};

module.exports = nextConfig;
