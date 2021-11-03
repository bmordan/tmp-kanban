FROM node:14-alpine3.12
RUN mkdir -p /app
WORKDIR /app

COPY ./public ./public/
COPY ./src ./src/
COPY ./views ./views/
COPY ./*.j* ./

RUN npm install --only=prod
CMD [ "npm", "start" ]