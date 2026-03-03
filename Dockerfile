# Build stage
FROM node:22-alpine AS builder

# Upgrade all Alpine packages to patch known CVEs in the base image
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy Prisma schema before npm ci so the postinstall hook
# ("prisma generate") can run successfully during installation
COPY prisma ./prisma
COPY prisma.config.ts ./

# Install ALL dependencies (--include=dev ensures devDeps are installed
# even when Coolify injects NODE_ENV=production at build time)
# postinstall automatically runs `prisma generate`
RUN npm ci --include=dev

# Copy remaining source code
COPY . .

# Build Next.js
RUN npm run build

# Runtime stage
FROM node:22-alpine

# Upgrade all Alpine packages to patch known CVEs in the base image
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Install production dependencies only
# Prisma files must be present before npm ci so the postinstall
# hook ("prisma generate") can find the schema.
COPY package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
RUN npm ci --omit=dev

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/generated ./src/generated

# Copy environment template
COPY .env.example ./.env.example

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const p=process.env.PORT||3001;require('http').get(`http://localhost:${p}`, (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Run migrations then start app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
