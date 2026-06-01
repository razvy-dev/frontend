# Use the official Node.js Alpine image for a lightweight footprint
FROM node:20-alpine

WORKDIR /app

# Copy package management files first to cache dependency layers
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your Next.js code
COPY . .

# Next.js development server runs on port 3000 by default
EXPOSE 3000

# Run Next.js in development mode with hot reloading
CMD ["npm", "run", "dev"]