FROM node:20-alpine
RUN apk --no-cache add --virtual .builds-deps build-base python3 tzdata

ENV TZ Europe/Moscow
ENV NODE_PATH /opt/indexer/node_modules

WORKDIR /opt/indexer/
COPY ./package.json ./
RUN yarn i
COPY . .
CMD [ "yarn", "start" ]

FROM node:20-alpine as dev
RUN apk --no-cache add --virtual .builds-deps build-base python3 tzdata

ENV TZ Europe/Moscow
ENV NODE_PATH /opt/indexer/node_modules

WORKDIR /opt/indexer/
CMD [ "yarn", "start" ]