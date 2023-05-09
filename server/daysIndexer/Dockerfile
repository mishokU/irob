FROM node:16.10.0-alpine
RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
ENV NODE_PATH /opt/indexer/node_modules

WORKDIR /opt/indexer/
COPY ./package.json ./
RUN npm i

CMD [ "yarn", "start" ]

FROM node:16.10-alpine as dev
RUN apk --no-cache add --virtual .builds-deps build-base python3 tzdata

ENV TZ Europe/Moscow
ENV NODE_PATH /opt/indexer/node_modules

WORKDIR /opt/indexer/
CMD [ "yarn", "start" ]