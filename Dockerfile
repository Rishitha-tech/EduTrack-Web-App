# ---------- Builder ----------
FROM node:20-bookworm-slim AS build
WORKDIR /app

# Install deps (cache-friendly)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ARG MONGODB_URI="mongodb://127.0.0.1:27017/dummy"
ENV MONGODB_URI=$MONGODB_URI
RUN npm run build

# Keep only prod deps for runtime
RUN npm prune --omit=dev

# ---------- Runner ----------
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built app + production deps
COPY --from=build /app ./

# Render provides $PORT; use 3000 locally
EXPOSE 3000
ENV PORT=3000

# Start Next.js on provided port
CMD ["sh","-c","npm run start -- -p ${PORT:-3000}"]
