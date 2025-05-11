/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static export
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
    unoptimized: true, // Disable image optimization (optional)
  },
  basePath: "", // Adjust if you're using a basePath for deployment
  assetPrefix: "", // If using a CDN, set assetPrefix
};

module.exports = nextConfig;
