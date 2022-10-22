import { User } from "@entities/user";
import {
  replyError,
  replySuccess,
  replyWarning,
  resultType,
} from "@graphql/mainType/result";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";

export const createFirstAdmin = {
  type: resultType,
  description: "Create first user admin.",
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    Logger.debug("user.mut.createFirstAdmin");

    const { name, username, password } = args;

    try {
      const count = await User.count();
      console.log(count);
      if (count != 0) return replyWarning("This operation cannot be performed");

      await User.insert({
        name,
        username,
        password: await auth.encript(password),
      });
    } catch (error) {
      return replyError("Error when create first admin", error);
    }

    return replySuccess(`User ${username} created!`);
  },
};
