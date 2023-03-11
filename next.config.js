/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,    
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "res.cloudinary.com", 
      "friends-academy-uk.s3.us-east-2.amazonaws.com",
      "leaseonchain.s3.us-west-1.amazonaws.com",
      "d1rot2z2p85pgg.cloudfront.net"
    ]
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLISHABLE_KEY,
    url: process.env.URL,
    base_url: process.env.BASE_URL,
    // email: process.env.email,
    // pass: process.env.pass
  }
}

module.exports = nextConfig