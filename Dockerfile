FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3001

ENV NODE_ENV=production

CMD ["node", "server.js"]
