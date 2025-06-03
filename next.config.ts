import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
      "https://6000-firebase-studio-1748657315174.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev",
      "https://publicityposterbackend.onrender.com",
    ],
  },
};

export default nextConfig;
