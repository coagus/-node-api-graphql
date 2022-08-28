# graphql-api-nodejs / 04 Express
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
yarn add express
```
Add developer modules
```console
yarn add -D typescript ts-node ts-loader webpack webpack-cli webpack-node-externals nodemon @types/node @types/express
```
Create typscript config
```console
tsc --init
```
Add outDir, rootDir and sourceMap into compilerOptions in tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```
Create webpack.config.js
```javascript
const path = require('path');

const nodeExternals = require('webpack-node-externals');
module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
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
    externals: [ nodeExternals() ],
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
    "dev": "nodemon ./src/index.ts"
  },
  "devDependencies": {
    "@types/express": "^4.17.13",
    "@types/node": "^18.7.13",
    "nodemon": "^2.0.19",
    "ts-loader": "^9.3.1",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.2",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-node-externals": "^3.0.0"
  },
  "dependencies": {
    "express": "^4.18.1"
  }
}
```
Create src/index.ts
```javascript
import express, { Application, Request, Response } from "express";

const api = async () => {
  const msg: string = "Hello World!";
  const port: number = 3000;
  const app: Application = express();

  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: msg,
    });
  });
  app.listen(port, () => {
    console.log(`Server run in ${port}`);
  });
};

api().catch((err) => {
  console.log(err);
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
asset index.js 928 bytes [emitted] [minimized] (name: main)
./src/index.ts 1.39 KiB [built] [code generated]
external "express" 42 bytes [built] [code generated]
webpack 5.74.0 compiled successfully in 2176 ms
Done in 3.62s.
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
Server run in port 3000
```
Difference

*src/index.ts*
```javascript
import express, { Application, Request, Response } from "express";

const api = async () => {
  const msg: string = "Hello World!";
  const port: number = 3000;
  const app: Application = express();

  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: msg,
    });
  });
  app.listen(port, () => {
    console.log(`Server run in port ${port}`);
  });
};

api().catch((err) => {
  console.log(err);
});
 ``` 
*dist/index.js*
```javascript
(()=>{"use strict";var e={607:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{c(o.next(e))}catch(e){i(e)}}function u(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,u)}c((o=o.apply(e,t||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(n(860));o(void 0,void 0,void 0,(function*(){const e=(0,i.default)();e.use(i.default.json()),e.get("/",((e,t)=>{t.json({message:"Hello World!"})})),e.listen(3e3,(()=>{console.log("Server run in 3000")}))})).catch((e=>{console.log(e)}))},860:e=>{e.exports=require("express")}},t={};!function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}(607)})();
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
[nodemon] starting `ts-node ./src/index.ts`
Server run in port 3000
```
Result in browser
![result api](resources/img/express_result_api.png?raw=true)