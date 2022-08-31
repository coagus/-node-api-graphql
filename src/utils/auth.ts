import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  getToken: (userId: number) => {
    Logger.debug("auth.getToken");
    const { SECRET_KEY = "MySecretKey", EXPIRES_IN = "1h" } = process.env;
    const token: string = jwt.sign({ userId }, SECRET_KEY, {
      expiresIn: EXPIRES_IN,
    });
    Logger.debug(token);
    return token;
  },
  checkToken: (req: any, res: any, next: any) => {
    Logger.debug("auth.checkToken");
    Logger.debug(JSON.stringify(req.body));
    const { SECRET_KEY = "MySecretKey" } = process.env;
    const schema: string = "Bearer ";
    const auth: string = req.headers["authorization"];
    const token: string = auth.includes(schema) ? auth.replace(schema, "") : "";

    if (token !== "") {
      Logger.debug(token);
      try {
        const payLoad = jwt.verify(token, SECRET_KEY);
        req.verified = payLoad;
        Logger.debug(JSON.stringify(req.verified));
      } catch (error) {
        Logger.debug(error);
        next();
      }
    }
    next();
  },
  verifyAuth: (req: any) => {
    Logger.debug("auth.verifyAuth");
    if (!req.verified) throw new Error("Operation not allowed, please login.");
  },
};
