import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const nextConfig: NextConfig = {
  /* config options here */
  images: {

    qualities: [65, 70, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Optimize webpack for better code splitting and CSS handling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Better code splitting for large libraries
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          // Optimize CSS chunking - combine smaller CSS files
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            // Default vendor chunk
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            // Separate heavy libraries into their own chunks
            swiper: {
              test: /[\\/]node_modules[\\/](swiper)[\\/]/,
              name: "swiper",
              chunks: "all",
              priority: 30,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: "framer-motion",
              chunks: "all",
              priority: 30,
            },
            reactIcons: {
              test: /[\\/]node_modules[\\/](react-icons)[\\/]/,
              name: "react-icons",
              chunks: "all",
              priority: 30,
            },
          },
        },
      }
    }
    return config
  },
}

export default withNextIntl(nextConfig)
