FROM node:lts
WORKDIR /src
ADD package*.json ./
ADD . /src
RUN npm i --silent
RUN npm run build
RUN npx prisma generate
CMD npm run start:dev
