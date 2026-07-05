import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Stripe is only registered once an API key is configured, so the server
// boots cleanly before the key is added.
const paymentProviders: any[] = []
if (process.env.STRIPE_API_KEY) {
  paymentProviders.push({
    resolve: "@medusajs/payment-stripe",
    id: "stripe",
    options: {
      apiKey: process.env.STRIPE_API_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  })
}

// Modules de base (custom + paiement). En dev local, on s'arrête là :
// cache/events/workflows tombent sur l'implémentation en mémoire par défaut,
// et les fichiers sur le disque local. En prod, Redis et R2 s'activent dès
// que les variables d'environnement correspondantes sont définies.
const modules: any[] = [
  { resolve: "./src/modules/cj", options: { apiKey: process.env.CJ_API_KEY, baseUrl: process.env.CJ_API_BASE_URL } },
  { resolve: "./src/modules/review" },
  { resolve: "./src/modules/newsletter" },
  { resolve: "@medusajs/medusa/payment", options: { providers: paymentProviders } },
]

// --- Redis (prod) : cache, bus d'événements, moteur de workflows ---
if (process.env.REDIS_URL) {
  modules.push(
    { resolve: "@medusajs/medusa/cache-redis", options: { redisUrl: process.env.REDIS_URL } },
    { resolve: "@medusajs/medusa/event-bus-redis", options: { redisUrl: process.env.REDIS_URL } },
    { resolve: "@medusajs/medusa/workflow-engine-redis", options: { redis: { url: process.env.REDIS_URL } } },
  )
}

// --- Stockage fichiers : Cloudflare R2 (S3-compatible) en prod ---
if (process.env.S3_BUCKET && process.env.S3_ENDPOINT) {
  modules.push({
    resolve: "@medusajs/medusa/file",
    options: {
      providers: [
        {
          resolve: "@medusajs/file-s3",
          id: "s3",
          options: {
            file_url: process.env.S3_FILE_URL,          // URL publique (CDN R2)
            access_key_id: process.env.S3_ACCESS_KEY_ID,
            secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
            region: process.env.S3_REGION || "auto",
            bucket: process.env.S3_BUCKET,
            endpoint: process.env.S3_ENDPOINT,           // https://<account>.r2.cloudflarestorage.com
            additional_client_config: { forcePathStyle: true },
          },
        },
      ],
    },
  })
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
  modules,
})
