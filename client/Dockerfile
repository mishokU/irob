FROM node:latest as builder
RUN apk --no-cache add --virtual .builds-deps build-base python3
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .

CMD ["npm", "run", "build"]

FROM node:16.10-alpine as dev
RUN apk --no-cache add --virtual .builds-deps build-base python3
WORKDIR /app
CMD ["yarn", "start"]
