FROM node:12.12.0-alpine

LABEL maintainer="Andrew Solera (andrewsolera@gmail.com)"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN apk add --no-cache tzdata
ENV TZ "America/Sao_Paulo"

WORKDIR /home/node/app

COPY package.json ./
COPY src/ src/

RUN npm install

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD [ "npm", "start" ]