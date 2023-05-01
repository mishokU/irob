FROM node:16.10.0-alpine
RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN apk add --no-cache tzdata

WORKDIR /opt/server/
COPY ./package.json ./
RUN rm -rf node_modules
RUN npm install --lts
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]