FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm cache clean --force

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]