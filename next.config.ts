import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "imljzgcuelzzzncfzlnc.supabase.co",
      },
      {
        protocol: "https",
        hostname: "simbzavrsyuonaiqwoya.supabase.co", // ✅ added your Supabase project hostname
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
    },
  },
};

export default nextConfig;
