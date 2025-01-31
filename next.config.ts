import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'cavlonkkogzqhrquwatk.supabase.co',
        pathname: "/storage/v1/object/public/avatars/**",
      },
      {
        protocol: "https",
        hostname: 'randomuser.me',
        pathname: "/api/portraits/**",
      }
    ],
  },
  /* config options here */
  output: "standalone",
};

export default nextConfig;
