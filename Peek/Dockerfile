FROM node:16.10.0-alpine as build-stage
RUN apk update && apk add git

COPY . ./app
WORKDIR /app/Peek
RUN ls /app
RUN yarn install && yarn build
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/Peek/nginx-custom.conf /etc/nginx/conf.d/default.conf
VOLUME /var/log/nginx
RUN pwd


COPY --from=build-stage /app/Peek/dist/peek /usr/share/nginx/html
RUN ls /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
