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
