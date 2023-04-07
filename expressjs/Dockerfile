FROM node:16-buster-slim

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ['node', 'app.js']