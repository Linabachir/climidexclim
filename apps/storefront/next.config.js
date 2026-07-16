const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

// Domaine où sont servies les images produit en prod (bucket public R2 /
// domaine CDN Cloudflare), ex. "cdn.climidex.com" ou "pub-xxxx.r2.dev".
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
  // Tree-shaking ciblé : n'embarque que les fonctions réellement importées
  // (lodash côté client via product-actions, icônes Medusa) au lieu du module entier.
  experimental: {
    optimizePackageImports: ["lodash", "@medusajs/icons"],
  },
  // En-têtes de sécurité appliqués à toutes les réponses. Sous-ensemble
  // volontairement sûr : on NE restreint PAS `payment`/`fullscreen` dans
  // Permissions-Policy pour préserver Apple Pay / Google Pay (Stripe).
  // La CSP n'est pas ici : elle doit d'abord être testée en Report-Only
  // (Stripe, scripts inline de Next) avant d'être imposée.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ]
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
