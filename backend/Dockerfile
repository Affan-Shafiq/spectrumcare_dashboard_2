# ---- Stage 1: Install production dependencies ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy manifests first for layer caching
COPY package*.json ./
RUN npm ci --only=production

# ---- Stage 2: Production image ----
FROM node:20-alpine AS production

WORKDIR /app

# Copy production node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application source
COPY . .

# Do NOT copy serviceAccountKey.json — credentials come from
# the FIREBASE_SERVICE_ACCOUNT_JSON environment variable in Railway

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Railway injects PORT automatically; default to 5000 for local docker run
EXPOSE 5000

CMD ["node", "server.js"]
