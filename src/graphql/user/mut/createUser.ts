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

export const createUser = {
  type: resultType,
  description: "Create user",
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any, req: any) {
    Logger.debug("user.mut.createUser");

    const { name, username, password } = args;

    try {
      auth.verifyAuth(req);
      const user = await User.findOneBy({ username });

      if (user)
        return replyWarning(`Username ${username} exists, please try other.`);

      await User.insert({
        name,
        username,
        password: await auth.encript(password),
      });
    } catch (error) {
      return replyError("Error in create User.", error);
    }

    return replySuccess(`User ${username} created!`);
  },
};
