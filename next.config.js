// // frontend/next.config.js
// module.exports = {
//   images: {
//     domains: [
//       "res.cloudinary.com",
//       "source.unsplash.com",
//       "images.unsplash.com",
//       "https://publicityposterbackend.onrender.com",
//       "placehold.co",
//     ],
//     // Optional advanced configuration:
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     minimumCacheTTL: 60,
//   },
// };
// frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    dangerouslyAllowSVG: true, // ⚠ Only use this if the source (placehold.co) is trusted
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "publicityposterbackend.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
