import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tozqvknprvlkruyydlat.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/products/**",
      },
    ],
  },
  // If lint/type errors exist, Vercel will fail. 
  // We can use these if the Next.js version supports them correctly.
  // For now, let's keep it simple to avoid type mismatches in different environments.
};

export default nextConfig;
