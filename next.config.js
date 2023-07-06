/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

module.exports = nextConfig;
