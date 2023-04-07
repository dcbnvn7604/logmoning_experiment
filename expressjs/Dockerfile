FROM node:16-buster-slim

RUN apt update && apt install -y curl

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ['node', 'app.js']

HEALTHCHECK --interval=5m --timeout=3s CMD curl localhost:80 || exit 1
