# Stage 1: Build the React app
FROM node:22-slim AS build

WORKDIR /app

# Copy and install deps
COPY package*.json ./
RUN npm install

# Copy all files and build
COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
