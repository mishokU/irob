# dev
FROM node:16.10.0-alpine AS dev
RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN apk add --no-cache tzdata

WORKDIR /opt/server/
COPY ./package.json ./
RUN npm cache clean --force && rm -rf node_modules
RUN npm install --lts
RUN npm i
COPY . .
CMD [ "npm", "run", "server" ]