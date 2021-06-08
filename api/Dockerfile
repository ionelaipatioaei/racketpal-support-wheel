FROM node:14.15.4-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY ./src/ ./src/

RUN npm run build

EXPOSE 4000
ENV NODE_END=production
ENV PORT=4000

# NOTE: BAD PRACTICE
ENV MONGO_HOST='mongo'
ENV MONGO_PORT=27117
ENV MONGO_DB='admin'
ENV MONGO_USER='support_wheel_user'
ENV MONGO_PASS='support_wheel_password'

CMD ["npm", "run", "start"]
