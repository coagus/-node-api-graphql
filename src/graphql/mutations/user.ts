import { User } from "@entities/user";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";

export const CREATE_FIRST_ADMIN = {
  type: MessageType,
  description: "Create first user admin.",
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.user.CREATE_FIRST_ADMIN");

    const { name, username, password } = args;

    try {
      const count = await User.count();

      if (count != 0)
        return msg.replyWarning("This operation cannot be performed");

      await User.insert({
        name,
        username,
        password: await auth.encript(password),
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`User ${username} created!`);
  },
};

export const CREATE_USER = {
  type: MessageType,
  description: "Create user",
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.user.CREATE_USER");

    const { name, username, password } = args;

    try {
      auth.verifyAuth(req);
      const user = await User.findOneBy({ username });

      if (user)
        return msg.replyWarning(
          `Username ${username} exists, please try other.`
        );

      await User.insert({
        name,
        username,
        password: await auth.encript(password),
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`User ${username} created!`);
  },
};

export const LOGIN = {
  type: MessageType,
  description: "User login",
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    Logger.debug("mutations.user.LOGIN");
    const { username, password } = args;
    try {
      const user = await User.findOneBy({ username });

      if (!user) return msg.replyWarning(`User ${username} not exists!`);

      if (!(await auth.comparePassword(password, user.password)))
        return msg.replyWarning("Invalid password!");

      return msg.replyToken(auth.getToken(user.id));
    } catch (error) {
      return msg.replyError(error);
    }
  },
};
