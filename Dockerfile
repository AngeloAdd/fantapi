FROM node:16.15.0-alpine

RUN apk add bash

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install --quiet
COPY . .
