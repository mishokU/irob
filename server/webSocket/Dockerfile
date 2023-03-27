FROM node:16.10.0-alpine
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
ENV NODE_PATH /opt/ws/node_modules

WORKDIR /opt/ws/

CMD [ "npm", "run", "start" ]