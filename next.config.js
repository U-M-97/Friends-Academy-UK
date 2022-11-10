/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn-icons-png.flaticon.com", "lh3.googleusercontent.com", "platform-lookaside.fbsbx.com", "res.cloudinary.com"]
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLISHABLE_KEY,
    url: process.env.URL,
    base_url: process.env.BASE_URL
  }
}

module.exports = nextConfig