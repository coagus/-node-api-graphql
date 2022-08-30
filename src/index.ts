require("dotenv").config();
import express, { Application, Request, Response } from "express";
import { Logger } from "@utils/logger";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

const api = async () => {
  const { PORT = 3000, NODE_ENV = "development" } = process.env;
  const msg: string = "Hello World!";
  const schema = buildSchema(`
    type Query {
        hello: String
    }
  `);
  const resolvers = {
    hello: () => {
      return msg;
    },
  };
  const app: Application = express();

  app.use(express.json());
  app.use(
    "/api",
    graphqlHTTP({
      schema,
      graphiql: NODE_ENV === "development",
      rootValue: resolvers,
    })
  );
  app.listen(PORT, () => {
    Logger.info(`Server runnig in port ${PORT}`);
  });
};

api().catch((err) => {
  Logger.error(err);
});
