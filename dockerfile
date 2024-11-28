# Build stage
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built assets from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/server.js ./src/server.js

# Expose ports for Vite and the server
EXPOSE 5173 3001

# Set environment variable to run in production mode
ENV NODE_ENV=production

# Start both the Vite dev server and the Node.js server
CMD ["sh", "-c", "npm run dev & npm run start-server"]