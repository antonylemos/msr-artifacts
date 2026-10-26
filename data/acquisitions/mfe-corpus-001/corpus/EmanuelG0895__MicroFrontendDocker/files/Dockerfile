# Multi-stage build for MF-Shell
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY MF-Shell/package*.json ./
COPY MF-Shell/pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy source code
COPY MF-Shell/ ./

# Build the application
RUN pnpm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install pnpm globally, curl for health checks, and serve for static files
RUN npm install -g pnpm serve && apk add --no-cache curl

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Copy startup script
COPY start.sh ./
RUN chmod +x start.sh

# Install only production dependencies
RUN pnpm install --prod

# Expose port
EXPOSE 3000

# Start the application with the startup script
CMD ["./start.sh"] 