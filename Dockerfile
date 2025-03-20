FROM node:lts-alpine

ADD . /app/
WORKDIR /app

# Remplacer yarn par npm
RUN npm install  

EXPOSE 3000
