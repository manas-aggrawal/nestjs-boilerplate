FROM node:lts

WORKDIR /src

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy everything else
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "run", "start:dev"]