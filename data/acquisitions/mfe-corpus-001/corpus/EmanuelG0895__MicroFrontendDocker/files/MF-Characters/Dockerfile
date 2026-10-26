# Multi-stage build for MF-Characters
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install pnpm globally, curl for health checks, and serve for static files
RUN npm install -g pnpm serve && apk add --no-cache curl

# Copy built application and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Expose port
EXPOSE 3001

# Start the application
CMD ["pnpm", "run", "start:prod"] 