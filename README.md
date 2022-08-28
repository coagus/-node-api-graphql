# graphql-api-nodejs / 01 NodeJS Yarn
GraphQL API with NodeJS.
## Get starter
Install nodejs: https://nodejs.dev/en/download/

Install Yarn
```log
npm i -g yarn
```
Initialize project with Yarn
```log
yarn init
```
Add script in package.json with command start for run project
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
    "start": "node ./src/index.js"
  }
}
```
Create src/index.js
```javascript
const msg = "Hello World!";
console.log(msg);
```
Start project with Yarn
```log
yarn start
```
Result:
```log
$ yarn start
yarn run v<#.##.## your version>
$ node ./src/index.js
Hello World!
Done in 0.32s.
```