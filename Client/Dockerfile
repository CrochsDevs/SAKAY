# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (make sure devDependencies are installed)
RUN if [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile; \
    else \
        npm ci --include=dev || npm install --include=dev; \
    fi

# Copy source code
COPY . .

# Build the app
RUN if [ -f yarn.lock ]; then \
        yarn build; \
    else \
        npm run build; \
    fi

# Production stage
FROM nginx:stable-alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Add nginx config
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
