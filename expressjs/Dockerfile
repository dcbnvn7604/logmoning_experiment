FROM node:16-buster-slim

RUN apt update && apt install -y curl

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["node", "app.js"]

HEALTHCHECK CMD curl -f localhost:80/healcheck || exit 1
