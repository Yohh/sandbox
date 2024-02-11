FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN yarn build

CMD yarn start:dev && \
yarn migration:create && \
yarn migration:generate && \
yarn migration:up
