FROM node:alpine

RUN npm install -g serve

COPY . /app

EXPOSE 8080

CMD ["serve", "-s", "app", "-l", "8080"]

