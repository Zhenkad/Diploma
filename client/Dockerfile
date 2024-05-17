FROM node:20

RUN mkdir -p /usr/src/client

WORKDIR /usr/src/client

COPY package.json /usr/src/client
RUN npm install
RUN npm install --global serve

COPY . /usr/src/client/

EXPOSE 3000

CMD ["serve", "-s", "build"]