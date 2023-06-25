FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json . 
RUN yarn install --frozen-lockfile

COPY . . 
CMD ["yarn", "start"]




