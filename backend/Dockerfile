# ---------- Stage 1 — Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Install all dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build using esbuild
RUN npm run build


# ---------- Stage 2 — Production Image ----------
FROM node:18-alpine

WORKDIR /app

# Copy production build
COPY --from=builder /app/bundle ./bundle

# Copy package.json & lockfile
COPY package.json package-lock.json ./

# Install production deps only
RUN npm ci --omit=dev

# Expose API port
EXPOSE 5001

# Run backend
CMD ["node", "bundle/index.js"]
