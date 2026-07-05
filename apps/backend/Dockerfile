# syntax=docker/dockerfile:1
# --- Backend Medusa v2 — build depuis la RACINE du monorepo ---
# Contexte de build = racine du dépôt (défini dans docker-compose.yml).
# On installe via le lockfile (npm ci) pour obtenir le MÊME arbre de
# dépendances hoisté qu'en local (sans doublon de @medusajs/utils, qui
# cassait l'ORM avec un install isolé).

FROM node:20-slim AS build
WORKDIR /repo
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json turbo.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/storefront/package.json apps/storefront/package.json
RUN npm ci --legacy-peer-deps
COPY . .
# Produit apps/backend/.medusa/server (serveur de prod)
RUN npx turbo run build --filter=@dtc/backend

FROM node:20-slim AS runner
WORKDIR /repo
ENV NODE_ENV=production
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
# On garde l'arbre hoisté du monorepo (identique au dev local qui fonctionne)
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/package.json /repo/turbo.json ./
COPY --from=build /repo/apps/backend ./apps/backend
WORKDIR /repo/apps/backend
EXPOSE 9000
# La migration est faite en externe (voir DEPLOY) ; ici on démarre seulement.
CMD ["npx", "medusa", "start"]
