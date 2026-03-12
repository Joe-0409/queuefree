/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@queuefree/shared', '@queuefree/ui-tokens']
};

export default nextConfig;
