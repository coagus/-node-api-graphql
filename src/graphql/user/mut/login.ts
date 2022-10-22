import { User } from "@entities/user";
import {
  replyError,
  replySuccess,
  replyWarning,
} from "@graphql/mainType/result";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { tokenType } from "@graphql/user/type/token";

export const login = {
  type: tokenType,
  description: "User login",
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    Logger.debug("user.mut.login");
    const { username, password } = args;
    try {
      const user = await User.findOneBy({ username });

      if (!user) return replyWarning(`User ${username} not exists!`);

      if (!(await auth.comparePassword(password, user.password)))
        return replyWarning("Invalid password!");

      return { result: replySuccess("Logged!"), token: auth.getToken(user.id) };
    } catch (error) {
      return replyError("Error in login!", error);
    }
  },
};
