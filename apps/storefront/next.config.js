const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

// Domaine où sont servies les images produit en prod (bucket public R2 /
// domaine CDN Cloudflare), ex. "cdn.climidex.fr" ou "pub-xxxx.r2.dev".
const IMAGE_HOSTNAME = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Build autonome pour Docker (serveur minimal dans .next/standalone).
  output: "standalone",
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME,
            },
          ]
        : []),
      ...(IMAGE_HOSTNAME
        ? [{ protocol: "https", hostname: IMAGE_HOSTNAME }]
        : []),
    ],
  },
}

module.exports = nextConfig
