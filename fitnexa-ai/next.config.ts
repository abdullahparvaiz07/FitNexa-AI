import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@tensorflow-models/pose-detection', '@mediapipe/pose'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      }
    ],
  },
};

export default nextConfig;
