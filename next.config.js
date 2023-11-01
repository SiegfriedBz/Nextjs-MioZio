/** @type {import('next').NextConfig} */
const cloudinaryBaseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLOUDINARY_BASE_URL: cloudinaryBaseUrl,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
