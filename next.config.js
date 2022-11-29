/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['megaphone.imgix.net']
  }
}

module.exports = nextConfig
