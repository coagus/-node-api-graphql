FROM node:16-alpine

WORKDIR /api

COPY . .

RUN yarn && yarn build && \
    rm -rf src tsconfig.json webpack.config.js yarn.lock

EXPOSE 3001

CMD ["yarn", "start"]

# docker build -t coagus/api-graphql-nodejs .
# docker run -p 3001:3001 -dit --name=api coagus/api-graphql-nodejs
# docker exec -it api ash

# docker commit f5281570be4e coagus/api-graphql-nodejs:v0.1