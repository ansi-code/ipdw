FROM node:20 AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY ./src ./src
COPY tsconfig.json ./
RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

ENV NODE_ENV=production
ENV DEBUG=acme-client

EXPOSE 4001 4002 443 80

CMD ["node", "dist/index.js"]
