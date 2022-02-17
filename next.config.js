/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://fakestoreapi.com"],
    loader: "custom",
    path: "/",
  },
}

module.exports = nextConfig
