FROM node:16-alpine3.17

ENV MONGOURI=mongodb+srv://galaxyeye:123456%40@cluster0.ssgyfw0.mongodb.net/galaxyEyeDatabase?retryWrites=true&w=majority

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm" , "start" ]


