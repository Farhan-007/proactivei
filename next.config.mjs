/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable eslint checking during production builds if needed for fast compilation
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
