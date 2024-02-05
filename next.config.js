/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/titles",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/",
        destination: "/collection",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "psnobj.prod.dl.playstation.net",
      },
      {
        protocol: "https",
        hostname: "image.api.playstation.com",
      },
    ],
  },
};

module.exports = nextConfig;
