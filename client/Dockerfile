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
CMD ["npm", "run", "start"]


# FROM nginx
# EXPOSE 3000
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html