FROM node:latest

WORKDIR /usr/src/app

RUN npm install mysql2 --save && \
    npm install chance --save

EXPOSE 3000

CMD ["node", "server.js"]