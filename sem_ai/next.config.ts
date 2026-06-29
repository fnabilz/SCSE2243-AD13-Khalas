import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["recharts"],
  allowedDevOrigins: ['192.168.56.1']
};

export default nextConfig;
