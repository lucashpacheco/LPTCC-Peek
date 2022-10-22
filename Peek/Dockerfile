FROM node:16.10.0-alpine as build-stage
RUN apk update && apk add git
RUN ls ./
RUN ls .
COPY . ./app
WORKDIR /app
RUN yarn install && yarn build

FROM nginx:stable-alpine as production-stage
VOLUME ./var/log/nginx
#COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
RUN pwd
RUN ls /
RUN ls /app
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
