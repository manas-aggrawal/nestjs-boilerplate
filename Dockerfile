FROM node:lts
ARG NPM_TOKEN
WORKDIR /src
ADD package*.json ./
ADD . /src
RUN npm i --silent
RUN npm run build
COPY .npmrc .npmrc
RUN npx prisma generate
CMD npm run start:dev
