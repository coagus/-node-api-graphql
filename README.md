# graphql-api-nodejs / 07 Alias Path
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
yarn add express dotenv winston
```
Add developer modules
```console
yarn add -D typescript ts-node ts-loader webpack webpack-cli webpack-node-externals tsconfig-paths-webpack-plugin nodemon @types/node @types/express
```
Create typscript config
```console
tsc --init
```
Add outDir, rootDir, bseUrl, paths, sourceMap into compilerOptions in tsconfig.json
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
Create src/index.ts
```javascript
require("dotenv").config();
import express, { Application, Request, Response } from "express";
import { Logger } from "@utils/logger";

const api = async () => {
  const { PORT = 3000 } = process.env;
  const msg: string = "Hello World!";
  const app: Application = express();

  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: msg,
    });
  });
  app.listen(PORT, () => {
    Logger.info(`Server run in port ${PORT}`);
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
asset index.js 1.47 KiB [compared for emit] [minimized] (name: main)
cacheable modules 2.25 KiB
  ./src/index.ts 1.5 KiB [built] [code generated]
  ./src/utils/logger.ts 764 bytes [built] [code generated]
external "dotenv" 42 bytes [built] [code generated]
external "express" 42 bytes [built] [code generated]
external "winston" 42 bytes [built] [code generated]
webpack 5.74.0 compiled successfully in 4621 ms
Done in 7.41s.
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
[2022-08-29T23:58:40.314Z] info: Server run in port 3001
```
*dist/index.js* result:
```javascript
(()=>{"use strict";var e={607:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,a)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),o(142).config();const s=n(o(860)),i=o(645);r(void 0,void 0,void 0,(function*(){const{PORT:e=3e3}=process.env,t=(0,s.default)();t.use(s.default.json()),t.get("/",((e,t)=>{t.json({message:"Hello World!"})})),t.listen(e,(()=>{i.Logger.info(`Server run in port ${e}`)}))})).catch((e=>{i.Logger.error(e)}))},645:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Logger=void 0;const r=o(773),{LEVEL:n="info",MAX_SIZE:s=512e4,MAX_FILES:i=5,FILE_LOG:a="./logs/API.log"}=process.env;t.Logger=(0,r.createLogger)({format:r.format.combine(r.format.simple(),r.format.timestamp(),r.format.printf((e=>`[${e.timestamp}] ${e.level}: ${e.message}`))),transports:[new r.transports.Console({level:n}),new r.transports.File({maxsize:s,maxFiles:i,filename:a})]})},142:e=>{e.exports=require("dotenv")},860:e=>{e.exports=require("express")},773:e=>{e.exports=require("winston")}},t={};!function o(r){var n=t[r];if(void 0!==n)return n.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,o),s.exports}(607)})();
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
[2022-08-29T23:59:28.931Z] info: Server run in port 3001
```
Result in browser

![result api](resources/img/express_result_api.png?raw=true)