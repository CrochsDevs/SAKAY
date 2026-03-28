#!/bin/bash
# deploy.sh - Complete deployment script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment of Sakay App...${NC}"

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Running as root - make sure this is intended${NC}"
fi

# Step 1: Pull latest code
echo -e "${GREEN}📦 Pulling latest code...${NC}"
git pull origin main

# Step 2: Update React app if it's a separate repo
if [ -d "Client/.git" ]; then
    echo -e "${GREEN}🔄 Updating React app...${NC}"
    cd Client && git pull && cd ..
fi

# Step 3: Create necessary directories
echo -e "${GREEN}📁 Creating directories...${NC}"
mkdir -p certbot/www certbot/conf
chmod 755 certbot/www

# Step 4: Check if SSL certificate exists
if [ -f "certbot/conf/live/sakay.online/fullchain.pem" ]; then
    echo -e "${GREEN}🔐 SSL certificate found, using HTTPS config${NC}"
    cp nginx/conf/https.conf nginx/conf/sakay-client.conf
else
    echo -e "${YELLOW}⚠️  No SSL certificate found, starting with HTTP config${NC}"
    cp nginx/conf/http-only.conf nginx/conf/sakay-client.conf
fi

# Step 5: Build and start containers
echo -e "${GREEN}🐳 Building and starting containers...${NC}"
docker compose down
docker compose up -d --build

# Step 6: Wait for services to be ready
echo -e "${GREEN}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Step 7: Check if services are running
if docker compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Services are running!${NC}"
    docker compose ps
else
    echo -e "${RED}❌ Some services failed to start. Check logs with: docker compose logs${NC}"
    exit 1
fi

# Step 8: If no SSL cert, offer to set it up
if [ ! -f "certbot/conf/live/sakay.online/fullchain.pem" ]; then
    echo -e "${YELLOW}📢 To set up SSL certificates, run: ./scripts/setup-ssl.sh sakay.online your-email@example.com${NC}"
fi

echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo -e "Your app is available at: http://$(curl -s ifconfig.me)"
