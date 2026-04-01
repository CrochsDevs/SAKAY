FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including nodemon as dev dependency
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start server with node directly (not nodemon) for production
CMD ["node", "src/index.js"]
