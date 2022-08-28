# graphql-api-nodejs / 02 Typescript
GraphQL API with NodeJS.
## Get starter
Install nodejs: https://nodejs.dev/en/download/

Install Yarn and Typescript
```log
npm i -g yarn typescript
```
Initialize project with Yarn
```log
yarn init
```
Add developer modules
```log
yarn add -D typescript
```
Create typscript config
```log
tsc --init
```
Add outDir and rootDir into compilerOptions in tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2016",                        
    "module": "commonjs",                      
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,                   
    "forceConsistentCasingInFileNames": true,  
    "strict": true,                            
    "skipLibCheck": true                       
  }
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
    "build": "tsc -p ."
  },
  "devDependencies": {
    "typescript": "^4.8.2"
  }
}
```
Create src/index.ts
```javascript
const msg: string = "Hello World!";
console.log(msg);
```
Build project with Yarn
```log
yarn build
```
Result:
```log
$ yarn build
yarn run v<#.##.## your version>
$ tsc -p .
Done in 1.16s.
```
Start project with Yarn
```log
yarn start
```
Result:
```log
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
"use strict";
const msg = "Hello World!";
console.log(msg);
```