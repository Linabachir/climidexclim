# syntax=docker/dockerfile:1
# --- Storefront Next.js (build context = apps/storefront) ---

FROM node:20-slim AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps

FROM node:20-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Les variables NEXT_PUBLIC_* sont figées AU BUILD → passées en arguments.
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_IMAGE_HOSTNAME
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL \
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY \
    NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_IMAGE_HOSTNAME=$NEXT_PUBLIC_IMAGE_HOSTNAME
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8000
# Sortie "standalone" : serveur minimal + assets statiques + public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 8000
CMD ["node", "server.js"]
