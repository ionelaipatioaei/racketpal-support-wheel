FROM node:14.15.4-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm rebuild node-sass

RUN npm run build

EXPOSE 3000
# Set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# Set app port
ENV NUXT_PORT=3000
# Set the node env to production
ENV NODE_END=production
# Set the api endpoint
ENV API_ENDPOINT=http://api:4000

CMD ["npm", "run", "start"]
