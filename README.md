# graphql-api-nodejs / 09 GraphQL ObjectType
GraphQL API with NodeJS.
## Get starter
Install nodejs: https://nodejs.dev/en/download/

Install Yarn and Typescript
```console
npm i -g yarn typescript
```
Initialize project with Yarn
```console
yarn init
```
Add modules
```console
yarn add express dotenv winston graphql express-graphql
```
Add developer modules
```console
yarn add -D typescript ts-node ts-loader webpack webpack-cli webpack-node-externals tsconfig-paths-webpack-plugin nodemon @types/node @types/express
```
Create typscript config
```console
tsc --init
```
Add sourceMap, outDir, rootDir, bseUrl and paths into compilerOptions in tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": "./",
    "paths": {
      "@utils/*": [
        "src/utils/*"
      ],
      "@graphql": [
        "src/graphql"
      ],
      "@queries/*": [
        "src/graphql/queries/*"
      ],
      "@type_defs/*": [
        "src/graphql/type_defs/*"
      ]
    },
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```
Create .env file for environments vars
```bash
NODE_ENV="development"
PORT=3001

# LOGGER
FILE_LOG="./logs/GraphQL-API.log"
LEVEL="debug" # error, warn, help, data, info, debug
MAX_SIZE=5120000
MAX_FILES=5
```
Create webpack.config.js
```javascripts
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
    mode: NODE_ENV,
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
            },
        ]
    },
    externals: [nodeExternals()],
}
```
Add script in package.json with command dev, build and start
```json
{
  "name": "graphql-api-nodejs",
  "version": "1.0.0",
  "description": "GraphQL API with nodejs",
  "main": "index.js",
  "repository": "https://github.com/coagus/graphql-api-nodejs.git",
  "author": "Christian Agustin <christian@agustin.gt>",
  "license": "MIT",
  "scripts": {
    "start": "node ./dist/index.js",
    "build": "webpack",
    "dev": "nodemon -r tsconfig-paths/register ./src/index.ts"
  },
  "devDependencies": {
    "@types/express": "^4.17.13",
    "@types/node": "^18.7.13",
    "nodemon": "^2.0.19",
    "ts-loader": "^9.3.1",
    "ts-node": "^10.9.1",
    "tsconfig-paths-webpack-plugin": "^4.0.0",
    "typescript": "^4.8.2",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-node-externals": "^3.0.0"
  },
  "dependencies": {
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-graphql": "^0.12.0",
    "graphql": "^16.6.0",
    "winston": "^3.8.1"
  }
}
```
Create src/utils/logger.ts
```javascript
import { createLogger, format, transports } from "winston";

const {
  LEVEL = "info",
  MAX_SIZE = 5120000,
  MAX_FILES = 5,
  FILE_LOG = "./logs/API.log",
} = process.env;

export const Logger = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(
      (logInfo) => `[${logInfo.timestamp}] ${logInfo.level}: ${logInfo.message}`
    )
  ),
  transports: [
    new transports.Console({
      level: LEVEL,
    }),
    new transports.File({
      maxsize: MAX_SIZE as number,
      maxFiles: MAX_FILES as number,
      filename: FILE_LOG,
    }),
  ],
});
```
Create src/graphql/type_defs/message.ts
```javascript
import { GraphQLObjectType, GraphQLString } from "graphql";

export const MessageType = new GraphQLObjectType({
  name: "Message",
  description: "Message Result",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});
```
Create src/graphql/queries/message.ts
```javascript
import { GraphQLString } from "graphql";
import { MessageType } from "@type_defs/message";

export const GET_MESSAGE = {
  type: MessageType,
  description: "Get Message",
  args: {
    name: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return {
        message: `Hello ${args.name}!`
    }
  },
};
```
Create src/graphql/index.ts
```javascript
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_MESSAGE } from "@queries/message";

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Query List",
  fields: {
    getMessage: GET_MESSAGE,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
});
```
Create src/index.ts
```javascript
require("dotenv").config();
import express, { Application } from "express";
import { Logger } from "@utils/logger";
import { graphqlHTTP } from "express-graphql";
import { schema } from "@graphql";

const api = async () => {
  const { PORT = 3000, NODE_ENV = "development" } = process.env;
  const app: Application = express();

  app.use(express.json());
  app.use(
    "/api",
    graphqlHTTP({
      schema,
      graphiql: NODE_ENV === "development",
    })
  );
  app.listen(PORT, () => {
    Logger.info(`Server runnig in port ${PORT}`);
  });
};

api().catch((err) => {
  Logger.error(err);
});
```
Build project with Yarn
```console
yarn build
```
Result:
```console
$ yarn build
yarn run v<#.##.## your version>
$ webpack
asset index.js 2.33 KiB [emitted] [minimized] (name: main)
cacheable modules 3.62 KiB
  modules by path ./src/graphql/ 1.24 KiB
    ./src/graphql/index.ts 437 bytes [built] [code generated]
    ./src/graphql/queries/message.ts 477 bytes [built] [code generated]
    ./src/graphql/type_defs/message.ts 353 bytes [built] [code generated]
  ./src/index.ts 1.64 KiB [built] [code generated]
  ./src/utils/logger.ts 764 bytes [built] [code generated]
external "dotenv" 42 bytes [built] [code generated]
external "express" 42 bytes [built] [code generated]
external "express-graphql" 42 bytes [built] [code generated]
external "winston" 42 bytes [built] [code generated]
external "graphql" 42 bytes [built] [code generated]
webpack 5.74.0 compiled successfully in 2491 ms
Done in 3.82s.
```
Start project with Yarn
```console
yarn start
```
Result:
```console
$ yarn start
yarn run v<#.##.## your version>
$ node ./dist/index.js
[2022-08-30T07:28:12.160Z] info: Server runnig in port 3001
```
Start project with Yarn in DEV
```console
yarn dev
```
Result:
```console
$ yarn dev
yarn run v<#.##.## your version>
$ nodemon ./src/index.ts
[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node -r tsconfig-paths/register ./src/index.ts`
[2022-08-30T07:27:45.199Z] info: Server runnig in port 3001
```
Result in browser

![result api](resources/img/api_result.png?raw=true)