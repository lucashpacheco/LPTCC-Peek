FROM node:16.10.0-alpine as build-stage
RUN apk update && apk add git
# RUN ls ./
# RUN ls .
COPY . ./app
#COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
WORKDIR /app/Peek
RUN ls /app
RUN yarn install && yarn build
FROM nginx:stable-alpine as production-stage
VOLUME /var/log/nginx
RUN pwd
RUN ls ./app
RUN ls ./usr/share/nginx/html
# RUN ls /app
COPY --from=build-stage /app/Peek/dist/peek /usr/share/nginx/html
# RUN ls /app/Peek/dist
RUN ls /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
