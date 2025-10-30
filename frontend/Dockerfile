# Use Debian-based Node 22 (not alpine)
FROM node:22-slim

WORKDIR /app

COPY package*.json ./

# Clean install to avoid cache issues
RUN rm -rf node_modules package-lock.json && npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
