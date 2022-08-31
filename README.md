# graphql-api-nodejs / 12 Auth Bcrypt and corse
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
yarn add express corse dotenv winston graphql express-graphql typeorm pg bcrypt
```
Add developer modules
```console
yarn add -D typescript ts-node ts-loader webpack webpack-cli webpack-node-externals tsconfig-paths-webpack-plugin nodemon reflect-metadata @types/node @types/express @types/cors @types/bcrypt
```
Create typscript config
```console
tsc --init
```
### Config files

**tsconfig.json**

Add experimentalDecorators, emitDecoratorMetadata, sourceMap, outDir, rootDir, bseUrl and paths into compilerOptions.
```json
{
  "compilerOptions": {
    "target": "es2016",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
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
      "@mutations/*": [
        "src/graphql/mutations/*"
      ],
      "@type_defs/*": [
        "src/graphql/type_defs/*"
      ],
      "@database": [
        "src/database"
      ],
      "@entities/*": [
        "src/database/entities/*"
      ]
    },
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```
**.env**

Create .env file for environments vars
```bash
NODE_ENV="development"
PORT=3001

# LOGGER
FILE_LOG="./logs/GraphQL-API.log"
LEVEL="debug" # error, warn, help, data, info, debug
MAX_SIZE=5120000
MAX_FILES=5

# DATASOURCE POSTGRES
DS_PG_HOST="localhost"
DS_PG_PORT=5432
DS_PG_USER="postgres"
DS_PG_PASS="d3Ve10p"
DS_PG_DB="apidb"
```
**webpack.config.js**
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
**package.json**

Add script command dev, build and start
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
    "reflect-metadata": "^0.1.13",
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
    "pg": "^8.8.0",
    "typeorm": "^0.3.9",
    "winston": "^3.8.1"
  }
}
```
### Logger
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
### Auth
create src/utils/auth.ts
```javascript
import bcrypt from "bcrypt";
import { Logger } from "@utils/logger";

export const auth = {
  encript: async (password: string) => {
    Logger.debug("auth.encript");
    return await bcrypt.hash(password, 10);
  },
  comparePassword: async (password: string, passwordEncrypt: string) => {
    Logger.debug("auth.comparePassword");
    return await bcrypt.compare(password, passwordEncrypt);
  },
};

```
### Database
create src/database/index.ts
```javascript
import { User } from "@entities/user";
import { Logger } from "@utils/logger";
import { DataSource, DataSourceOptions } from "typeorm";

export const db = {
  initDbPg: async () => {
    Logger.debug("database.initDbPg");

    const {
      DS_PG_HOST = "localhost",
      DS_PG_PORT = 0,
      DS_PG_USER = "user",
      DS_PG_PASS = "pass",
      DS_PG_DB = "db",
    } = process.env;

    const dsPg: DataSourceOptions = {
      type: "postgres",
      host: DS_PG_HOST,
      port: DS_PG_PORT as number,
      username: DS_PG_USER,
      password: DS_PG_PASS,
      database: DS_PG_DB,
      logging: true,
      synchronize: true,
      entities: [User],
    };

    const dbPg = new DataSource(dsPg);

    try {
      await dbPg.initialize();
      Logger.info("Database postgres initialized successfuly!");
    } catch (error) {
      Logger.error(error);
      return false;
    }

    return true;
  },
};
```
### User
Create src/database/entities/user.ts
```javascript
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "User"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ unique: true })
  username!: string;
  @Column()
  password!: string;
}
```
Create src/graphql/type_defs/user.ts
```javascript
import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "User data.",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
```
**Query**

Create src/graphql/queries/user.ts
```javascript
import { User } from "@entities/user";
import { UserType } from "@type_defs/user";
import { Logger } from "@utils/logger";
import { GraphQLList } from "graphql";

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    description: "Get all user list.",
    resolve() {
        Logger.debug("graphql.queries.user.GET_ALL_USERS.resolve()")
        return User.find();
    }
}
```

**Mutation**

Create src/graphql/mutations/user.ts
```javascript
import { User } from "@entities/user";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";

export const CREATE_USER = {
  type: MessageType,
  description: "Create user",
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    Logger.debug("graphql.mutation.user.resolve");
    const { name, username, password } = args;

    try {
      const user = await User.findOneBy({ username });

      if (user)
        return msg.replyWarning(
          `Username ${username} exists, please try other.`
        );

      await User.insert({
        name,
        username,
        password: await auth.encript(password),
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`User ${username} created!`);
  },
};

export const LOGIN = {
  type: MessageType,
  description: "User login",
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    Logger.debug("mutations.user.LOGIN");
    const { username, password } = args;
    try {
      const user = await User.findOneBy({ username });

      if (!user) return msg.replyWarning(`Usuario ${username} no existe!`);

      if (!(await auth.comparePassword(password, user.password)))
        return msg.replyWarning("Contraseña incorrecta!");

      return msg.replySuccess("Login successfully!");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};

```

### Message
Create src/graphql/type_defs/message.ts
```javascript
import { Logger } from "@utils/logger";
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const MessageType = new GraphQLObjectType({
  name: "Message",
  description: "Message Result",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

export const msg = {
  replyError: (error: any) => {
    if (error instanceof Error) {
      const err = <Error>error;
      Logger.error(err.message);
      return { successful: false, message: err.message };
    }
    return { succesful: false, message: JSON.stringify(error) };
  },
  replyWarning: (message: string) => {
    Logger.warn(message);
    return { successful: false, message };
  },
  replySuccess: (message: string) => {
    Logger.info(message);
    return { successful: true, message };
  },
};
```
### GraphQL Schema
Create src/graphql/index.ts
```javascript
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "@queries/user";
import { CREATE_USER, LOGIN } from "@mutations/user";

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Query List",
  fields: {
    getAllUsers: GET_ALL_USERS,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation list",
  fields: {
    createUser: CREATE_USER,
    login: LOGIN,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
```
Create src/index.ts
```javascript
require("dotenv").config();
import "reflect-metadata";
import cors from 'cors';
import express, { Application } from "express";
import { Logger } from "@utils/logger";
import { graphqlHTTP } from "express-graphql";
import { schema } from "@graphql";
import { db } from "@database";

const api = async () => {
  const { PORT = 3000, NODE_ENV = "development" } = process.env;
  const app: Application = express();

  if (!(await db.initDbPg())) throw new Error("Error initializing databaes!");

  app.use(cors());
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
### Docker compose
Run postgress database from docker compose into docker folder:
```bash
docker compose up -d
```
Check containers:
```bash
$ docker ps
CONTAINER ID   IMAGE                                         COMMAND                  CREATED        STATUS                PORTS                                            NAMES
fe243b4a5824   adminer                                       "entrypoint.sh docke…"   12 days ago    Up 12 days            0.0.0.0:8080->8080/tcp                           adminer
68422b66f040   postgres                                      "docker-entrypoint.s…"   12 days ago    Up 11 days            0.0.0.0:5432->5432/tcp                           postgres
```
### Run API Dev
Start project with Yarn in DEV
```bash
yarn dev
```
Result:
```bash
$ yarn dev
yarn run v<#.##.## your version>
$ nodemon -r tsconfig-paths/register ./src/index.ts
[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node -r tsconfig-paths/register ./src/index.ts`
[2022-08-30T23:10:11.113Z] debug: database.initDbPg
query: SELECT * FROM current_schema()
query: SELECT version();
query: START TRANSACTION
query: SELECT * FROM current_schema()
query: SELECT * FROM current_database()
query: SELECT "table_schema", "table_name" FROM "information_schema"."tables" WHERE ("table_schema" = 'public' AND "table_name" = 'User')
query: SELECT * FROM "information_schema"."tables" WHERE "table_schema" = 'public' AND "table_name" = 'typeorm_metadata'
query: CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_29a05908a0fa0728526d2833657" UNIQUE ("username"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))
query: COMMIT
[2022-08-30T23:10:11.374Z] info: Database postgres initialized successfuly!
[2022-08-30T23:10:11.379Z] info: Server runnig in port 3001
```
Check table User in this link:
http://localhost:8080/?pgsql=host.docker.internal&username=postgres&db=apidb&ns=public&table=user
![user table](resources/img/user_table.png?raw=true)

Create new user with GraphQL

http://localhost:3001/api

```javascript
mutation {
   createUser(
    name: "Christian Agustin", 
    username: "coagus", 
    password: "abc123") {
    successful
    message
  }
}
```
Check result

![user table](resources/img/insert_user.png?raw=true)

Check log
```bash
[2022-08-31T01:11:00.048Z] debug: graphql.mutation.user.resolve
query: SELECT "User"."id" AS "User_id", "User"."name" AS "User_name", "User"."username" AS "User_username", "User"."password" AS "User_password" FROM "User" "User" WHERE ("User"."username" = $1) LIMIT 1 -- 
PARAMETERS: ["coagus"]
[2022-08-31T01:11:00.140Z] debug: auth.encript
query: INSERT INTO "User"("name", "username", "password") VALUES ($1, $2, $3) RETURNING "id" -- PARAMETERS: ["Christian Agustin","coagus","$2b$10$j6u6VNI8i/1MpS57sYWniu1/5phc.FO3ev5Rp6J5ZRSPwXAGwK1iO"]
[2022-08-31T01:11:00.215Z] info: User coagus created!
```

Check new row
http://localhost:8080/?pgsql=host.docker.internal&username=postgres&db=apidb&ns=public&select=user
![user table](resources/img/select_user.png?raw=true)

Check new row with GraphQL API
http://localhost:3001/api

Create query for user
```javascript
query {
  getAllUsers {
    id
    name
    username
    password
  }
}
```
Check result

![user table](resources/img/graphql_user.png?raw=true)

Check log
```bash
[2022-08-30T21:00:58.625Z] debug: graphql.queries.user.GET_ALL_USERS.resolve()
query: SELECT "User"."id" AS "User_id", "User"."name" AS "User_name", "User"."username" AS "User_username", "User"."password" AS "User_password" FROM "user" "User"
```
### Build and Start
Build project with Yarn
```bash
yarn build
```
Result:
```bash
$ yarn build
yarn run v<#.##.## your version>
$ webpack
asset index.js 7.56 KiB [emitted] [minimized] (name: main)
cacheable modules 13.3 KiB
  modules by path ./src/graphql/ 5.82 KiB 5 modules
  modules by path ./src/utils/*.ts 2.2 KiB 2 modules
  modules by path ./src/database/ 3.36 KiB 2 modules
  ./src/index.ts 1.89 KiB [built] [code generated]
external "dotenv" 42 bytes [built] [code generated]
external "reflect-metadata" 42 bytes [built] [code generated]
external "cors" 42 bytes [built] [code generated]
external "express" 42 bytes [built] [code generated]
external "express-graphql" 42 bytes [built] [code generated]
external "winston" 42 bytes [built] [code generated]
external "graphql" 42 bytes [built] [code generated]
external "typeorm" 42 bytes [built] [code generated]
external "bcrypt" 42 bytes [built] [code generated]
webpack 5.74.0 compiled successfully in 4069 ms
Done in 5.84s.
```
Start project with Yarn
```bash
yarn start
```
Result:
```bash
$ yarn start
yarn run v<#.##.## your version>
$ node ./dist/index.js
[2022-08-31T04:10:34.677Z] debug: database.initDbPg
query: SELECT * FROM current_schema()
query: SELECT version();
query: START TRANSACTION
query: SELECT * FROM current_schema()
query: SELECT * FROM current_database()
query: SELECT "table_schema", "table_name" FROM "information_schema"."tables" WHERE ("table_schema" = 'public' AND "table_name" = 'User')
query: SELECT * FROM "information_schema"."tables" WHERE "table_schema" = 'public' AND "table_name" = 'typeorm_metadata'
query: CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_29a05908a0fa0728526d2833657" UNIQUE ("username"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))
query: COMMIT
[2022-08-31T04:10:34.904Z] info: Database postgres initialized successfuly!
[2022-08-31T04:10:34.910Z] info: Server runnig in port 3001
```