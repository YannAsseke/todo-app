FROM node:18.13.0-alpine

ENV NODE_ENV = production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD ["node", "dist/main"]

