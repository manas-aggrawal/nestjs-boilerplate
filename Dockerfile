FROM node:lts
WORKDIR /nestjs-bp
ADD . ./
RUN npm install --legacy-peer-deps
RUN npm run build
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]