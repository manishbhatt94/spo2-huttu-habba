/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/spo2-huttu-habba',
  assetPrefix: '/spo2-huttu-habba/',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
