FROM node:18-alpine
WORKDIR /nestjs-bp
ADD . ./
RUN npm install --legacy-peer-deps
RUN npm run build
CMD ["npm", "run", "start:dev"]