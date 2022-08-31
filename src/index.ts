require("dotenv").config();
import "reflect-metadata";
import cors from "cors";
import express, { Application } from "express";
import { graphqlHTTP } from "express-graphql";
import { Logger } from "@utils/logger";
import { schema } from "@graphql";
import { db } from "@database";
import { auth } from "@utils/auth";

const api = async () => {
  const { PORT = 3000, NODE_ENV = "development" } = process.env;
  const app: Application = express();

  if (!(await db.initDbPg())) throw new Error("Error initializing databaes!");

  app.use(cors());
  app.use(express.json());
  app.use(auth.checkToken);
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
