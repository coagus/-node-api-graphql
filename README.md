# graphql-api-nodejs / 03 Webpack
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
Add developer modules
```console
yarn add -D typescript ts-node ts-loader webpack webpack-cli webpack-node-externals @types/node
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
Add script in package.json with command start and build
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
    "build": "webpack"
  },
  "devDependencies": {
    "@types/node": "^18.7.13",
    "ts-loader": "^9.3.1",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.2",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-node-externals": "^3.0.0"
  }
}
```
Create src/index.ts
```javascript
const msg: string = "Hello World!";
console.log(msg);
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
asset index.js 51 bytes [emitted] [minimized] (name: main)
./src/index.ts 63 bytes [built] [code generated]
webpack 5.74.0 compiled successfully in 1826 ms
Done in 3.40s.
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
Hello World!
Done in 0.32s.
```
Difference 
*src/index.ts*
```javascript
const msg: string = "Hello World!";
console.log(msg);
 ``` 
*dist/index.js*
```javascript
(()=>{"use strict";console.log("Hello World!")})();
```