FROM node:lts-alpine as build

WORKDIR '/usr/src/app'

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest

RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build -f /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf:ro
COPY --from=build -f /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]