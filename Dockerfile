# ─────────────────────────────────────────────────────────────────────────────
# Stage 1: Builder – installs all deps and compiles TypeScript
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first to leverage layer caching
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDeps needed for the build)
RUN npm ci

# Copy source and compile
COPY tsconfig*.json nest-cli.json ./
COPY src ./src

RUN npm run build

# Prune to production-only node_modules
RUN npm prune --production

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2: Production – lean image with only compiled output
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling + redis-cli for cache flushing on seed
RUN apk add --no-cache dumb-init redis

WORKDIR /app

# Non-root user for security (node user is built into node:alpine images)
USER node

# Copy compiled app and production node_modules from builder
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node package.json ./

# Copy entrypoint script
COPY --chown=node:node scripts/start.sh ./scripts/start.sh
RUN chmod +x ./scripts/start.sh

EXPOSE 3000

ENV NODE_ENV=production

# Use dumb-init as PID 1 to handle signals correctly
ENTRYPOINT ["dumb-init", "--"]
CMD ["./scripts/start.sh"]
