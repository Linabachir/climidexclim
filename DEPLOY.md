# Déploiement CLIMIDEX — Hetzner + Cloudflare

Stack : **1 VPS Hetzner** (Docker Compose : Postgres + Redis + Medusa + Next + Caddy) derrière **Cloudflare** (DNS, proxy, SSL) avec **R2** pour les images.

> Remplace partout `climidex.com` par ton domaine réel.

---

## 0. Prérequis
- Un domaine (idéalement géré par Cloudflare).
- Comptes : Hetzner Cloud, Cloudflare, Stripe.

---

## 1. Cloudflare — domaine, DNS, R2

1. **Ajouter le site** dans Cloudflare et faire pointer les *nameservers* du domaine vers Cloudflare.
2. **R2 → Create bucket** : `climidex-media`.
   - Active un **domaine public** pour le bucket (R2 → Settings → Public access), ex. `cdn.climidex.com` (ou l'URL `pub-xxx.r2.dev`).
   - **R2 → Manage API Tokens → Create** : note `Access Key ID`, `Secret`, et l'`endpoint` `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.
3. **DNS** (après avoir l'IP du serveur à l'étape 2) — enregistrements **proxied (nuage orange)** :
   | Type | Nom  | Contenu        |
   |------|------|----------------|
   | A    | `@`  | IP du serveur  |
   | A    | `www`| IP du serveur  |
   | A    | `api`| IP du serveur  |
4. **SSL/TLS → Overview → mode `Full`** (compatible avec `tls internal` de Caddy).

---

## 2. Hetzner — le serveur

1. **Create Server** : Ubuntu 24.04, type **CPX31** (4 vCPU / 8 Go). Ajoute ta clé SSH.
2. Connexion : `ssh root@IP_DU_SERVEUR`
3. Pare-feu + Docker :
   ```bash
   ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable
   curl -fsSL https://get.docker.com | sh
   ```
4. Récupère le code :
   ```bash
   git clone <URL_DE_TON_REPO> climidex && cd climidex
   cp .env.production.example .env
   # génère les secrets :
   echo "JWT_SECRET=$(openssl rand -hex 32)"; echo "COOKIE_SECRET=$(openssl rand -hex 32)"
   nano .env   # remplis TOUT (Postgres, secrets, R2, Stripe, domaine…)
   ```

---

## 3. Premier démarrage (ordre important)

La **publishable key** doit exister *avant* de builder le storefront (variable figée au build). On démarre donc le backend d'abord.

```bash
# 1) Backend + base + redis
docker compose up -d --build postgres redis backend
docker compose logs -f backend      # attendre "Server is ready"
```

```bash
# 2) Créer l'admin
docker compose exec backend npx medusa user -e toi@climidex.com -p 'MotDePasseFort'
```

4. Ouvre l'admin : **https://api.climidex.com/app** → connecte-toi.
   - **Settings → Publishable API keys** : crée-en une, copie la clé `pk_...`.
   - Colle-la dans `.env` → `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...`.

```bash
# 3) Builder + lancer le storefront + le proxy
docker compose up -d --build storefront caddy
```

---

## 4. Configuration boutique (dans l'admin Medusa)

- **Regions** → crée/édite la région **France** (devise **EUR**), ajoute le pays France, et rattache le **provider de paiement Stripe** + le **sales channel**.
- **Publishable key** → rattache-la au **sales channel** utilisé.
- **Product → Climaire** :
  - renomme les **variantes** CJ (« Desktop Household… » → « Blanc / Nickel »…),
  - rédige la **description**,
  - vérifie que les images sont bien uploadées (elles partiront sur R2).
- **Settings → Shipping** : crée les options de livraison (tarifs, zones).
- **Regions → Taxes** : configure la TVA.

---

## 5. Stripe (paiement réel)

1. `.env` : `STRIPE_API_KEY=sk_live_...` (déjà fait).
2. Stripe Dashboard → **Developers → Webhooks → Add endpoint** :
   `https://api.climidex.com/hooks/payment/stripe` → événement `payment_intent.*`.
   Copie le `whsec_...` → `.env` → `STRIPE_WEBHOOK_SECRET=`.
3. Redémarre le backend : `docker compose up -d backend`.

---

## 6. Vérifs finales
- `https://climidex.com` s'affiche, `https://api.climidex.com/health` répond `OK`.
- **Commande test** de bout en bout (ajout panier → paiement Stripe → e-mail).
- Configure un envoi d'**e-mails transactionnels** (module Notification + Resend/SendGrid) — sinon pas de confirmation de commande.
- Pages légales (Mentions légales / CGV / Confidentialité) + bandeau cookies.

---

## Mises à jour (redéploiement)
```bash
cd climidex && git pull
docker compose up -d --build
# si le schéma a changé, les migrations tournent au démarrage du backend
```

## Sauvegardes (à mettre en place)
- **Postgres** (cron) : `docker compose exec -T postgres pg_dump -U climidex climidex | gzip > backup_$(date +%F).sql.gz`
- Les **images** sont sur R2 (déjà répliquées/durables).

## Dépannage
- Logs : `docker compose logs -f backend` / `storefront` / `caddy`.
- Migrations manuelles : `docker compose exec backend npx medusa db:migrate`.
- CORS bloqué : vérifie `STORE_CORS` / `ADMIN_CORS` / `AUTH_CORS` dans `.env`.
- Images 403 : vérifie l'accès public du bucket R2 et `S3_FILE_URL` / `NEXT_PUBLIC_IMAGE_HOSTNAME`.
