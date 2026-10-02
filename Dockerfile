FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run check
USER node
ENV PORT=3000
EXPOSE 3000
CMD ["node", "src/server.js"]
