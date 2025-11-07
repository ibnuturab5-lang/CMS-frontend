import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  server:{
     trustHostHeader: process.env.CODESPACES === 'true',
  },
};

export default nextConfig;
