FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env.sample .env

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]