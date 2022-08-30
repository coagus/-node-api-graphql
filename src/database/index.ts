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
