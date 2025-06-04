// frontend/next.config.js
module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "source.unsplash.com",
      "images.unsplash.com",
      "https://publicityposterbackend.onrender.com",
    ],
    // Optional advanced configuration:
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};
