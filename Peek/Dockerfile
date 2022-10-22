FROM node:16.10.0-alpine as build-stage
WORKDIR /app
RUN apk update && apk add git
COPY . ./
RUN yarn install && yarn build

RUN pwd
RUN ls

FROM nginx:stable-alpine as production-stage
VOLUME ./var/log/nginx
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
