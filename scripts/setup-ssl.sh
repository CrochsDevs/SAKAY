#!/bin/bash
# setup-ssl.sh - Run this script to set up SSL certificates

set -e

DOMAIN="${1:-sakay.online}"
EMAIL="${2:-solomonallan27@gmail.com}"

echo "🚀 Setting up SSL for $DOMAIN"

# Step 1: Use HTTP-only config
echo "📝 Switching to HTTP-only configuration..."
cp nginx/conf/http-only.conf nginx/conf/sakay-client.conf

# Step 2: Reload nginx
echo "🔄 Reloading nginx..."
docker compose restart nginx-proxy

# Step 3: Get SSL certificate
echo "🔐 Obtaining SSL certificate from Let's Encrypt..."
docker compose run --rm certbot certonly --webroot \
    --webroot-path=/var/www/certbot \
    -d "$DOMAIN" \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email

# Step 4: Switch to HTTPS config
echo "📝 Switching to HTTPS configuration..."
cp nginx/conf/https.conf nginx/conf/sakay-client.conf

# Step 5: Reload nginx with HTTPS
echo "🔄 Reloading nginx with HTTPS..."
docker compose restart nginx-proxy

echo "✅ SSL setup complete! Your site is now available at https://$DOMAIN"
