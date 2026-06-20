import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "txqundomfyldiflmlfhc.supabase.co",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
