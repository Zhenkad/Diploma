FROM node:20

RUN mkdir -p /usr/src/server

WORKDIR /usr/src/server

RUN npm install --global nodemon

COPY package.json /usr/src/server
RUN npm install

COPY . /usr/src/server

EXPOSE 5000

CMD ["npm", "run", "dev" ]