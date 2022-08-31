import { User } from "@entities/user";
import { MessageType, msg } from "@type_defs/message";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";

export const CREATE_USER = {
  type: MessageType,
  description: "Create user",
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    Logger.debug("graphql.mutation.user.resolve");
    const { username } = args;

    try {
      const user = await User.findOneBy({ username });

      if (user)
        return msg.replyWarning(
          `Username ${username} exists, please try other.`
        );

      await User.insert(args);
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`User ${username} created!`);
  },
};
