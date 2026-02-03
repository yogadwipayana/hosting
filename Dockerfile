# =============================================================================
# Production-Ready Dockerfile for Dokploy.com Deployment
# Multi-stage build with Node.js 20 Alpine and Nginx
# =============================================================================

# -----------------------------------------------------------------------------
# Build Arguments
# -----------------------------------------------------------------------------
ARG NODE_VERSION=20-alpine
ARG NGINX_VERSION=alpine

# -----------------------------------------------------------------------------
# Stage 1: Dependencies
# Purpose: Install and cache dependencies for optimal layer caching
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS deps

# Set working directory
WORKDIR /app

# Install dependencies required for native module compilation
RUN apk add --no-cache libc6-compat

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies with npm ci for reproducible builds
# Using cache mount for npm cache to speed up subsequent builds
# Note: --legacy-peer-deps used due to react-helmet-async not yet supporting React 19
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund --legacy-peer-deps && \
    npm cache clean --force

# -----------------------------------------------------------------------------
# Stage 2: Build
# Purpose: Build the React/Vite application
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy package files
COPY package*.json ./

# Copy source code
COPY . .

# Set production environment
ENV NODE_ENV=production

# Build arguments for environment variables (Vite embeds these at build time)
ARG VITE_CLARITY_PROJECT_ID
ARG VITE_API_URL

# Set environment variables from build args for Vite to pick up during build
ENV VITE_CLARITY_PROJECT_ID=${VITE_CLARITY_PROJECT_ID}
ENV VITE_API_URL=${VITE_API_URL}

# Build the application
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: Production
# Purpose: Serve the built application with Nginx
# Using non-root nginx image for security
# -----------------------------------------------------------------------------
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS production

# Switch to root temporarily for setup
USER root

# Install additional security packages and curl for health checks
RUN apk add --no-cache \
    curl \
    ca-certificates \
    && rm -rf /var/cache/apk/*

# Create nginx user and group if not exists (nginx-unprivileged should have this)
# Set up proper directories and permissions
RUN mkdir -p /var/log/nginx /var/cache/nginx /var/run/nginx && \
    chown -R nginx:nginx /var/log/nginx /var/cache/nginx /var/run/nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Copy custom nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

# Verify files are in place
RUN ls -la /usr/share/nginx/html && \
    cat /etc/nginx/nginx.conf | head -20

# Set proper permissions for nginx directories
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Switch to non-root user for security
USER nginx

# Expose port 8080 (non-privileged port for non-root user)
EXPOSE 8080

# Health check for container orchestration
# Returns 200 OK if nginx is serving content properly
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Signal handling for graceful shutdown
STOPSIGNAL SIGTERM

# Start Nginx with daemon off for proper container signal handling
# Using exec form to ensure nginx receives signals directly
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# -----------------------------------------------------------------------------
# Labels for metadata and Dokploy compatibility
# -----------------------------------------------------------------------------
LABEL org.opencontainers.image.title="Dockploy Frontend" \
      org.opencontainers.image.description="Production-ready React frontend for Dokploy deployment" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.vendor="Dockploy" \
      maintainer="Dockploy Team" \
      dokploy.deploy.port="8080" \
      dokploy.deploy.healthcheck.path="/health"
