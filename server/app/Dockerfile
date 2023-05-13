FROM node:16.10.0-alpine
RUN apk --no-cache add --virtual .builds-deps build-base python3 tzdata

WORKDIR /opt/server/
COPY ./package.json ./
RUN yarn install
COPY . .
CMD [ "yarn", "server" ]

FROM node:16.10-alpine as dev
RUN apk --no-cache add --virtual .builds-deps build-base python3 tzdata

ENV TZ Europe/Moscow
ENV NODE_PATH /opt/server/node_modules

WORKDIR /opt/server/
CMD [ "yarn", "server" ]