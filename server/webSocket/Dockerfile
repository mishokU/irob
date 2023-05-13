FROM node:16.10.0-alpine
RUN apk --no-cache add --virtual .builds-deps build-base python3 tzdata

ENV TZ Europe/Moscow
ENV NODE_PATH /opt/ws/node_modules

WORKDIR /opt/ws/
COPY ./package.json ./
RUN yarn install
COPY . .
CMD [ "yarn", "prod" ]

FROM node:16.10-alpine as dev
RUN apk --no-cache add --virtual .builds-deps build-base python3 tzdata

ENV TZ Europe/Moscow
ENV NODE_PATH /opt/ws/node_modules

WORKDIR /opt/ws/
CMD [ "yarn", "start" ]