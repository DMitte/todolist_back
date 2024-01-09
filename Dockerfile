FROM node:21

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "/home/app/index.js"]