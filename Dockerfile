FROM node:alpine AS builder

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install

COPY . .

# Build app
RUN yarn build

# Run app
EXPOSE 3000
CMD [ "yarn", "start:prod" ]
