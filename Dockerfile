FROM node:18-alpine
WORKDIR /src
ADD package*.json ./
RUN npm i --legacy-peer-deps --silent
ADD . /src
RUN npm run build
CMD npm run start:dev
