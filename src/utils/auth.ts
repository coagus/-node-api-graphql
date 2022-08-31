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
