# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.20.0

FROM node:${NODE_VERSION}-alpine

# Use production environment
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Expose application port
EXPOSE 3001

# Run as non-root user
USER node

# Start application
CMD ["npm", "run", "prod"]