require("dotenv").config();
import "reflect-metadata";
import express, { Application } from "express";
import { Logger } from "@utils/logger";
import { graphqlHTTP } from "express-graphql";
import { schema } from "@graphql";
import { db } from "@database";

const api = async () => {
  const { PORT = 3000, NODE_ENV = "development" } = process.env;
  const app: Application = express();

  if (!(await db.initDbPg())) throw new Error("Error initializing databaes!");

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
