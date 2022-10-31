/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn-icons-png.flaticon.com", "lh3.googleusercontent.com", "platform-lookaside.fbsbx.com"]
  }
}

module.exports = nextConfig