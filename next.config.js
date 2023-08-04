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
