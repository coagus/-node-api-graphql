import { Logger } from "@utils/logger";
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const MessageType = new GraphQLObjectType({
  name: "Message",
  description: "Message Result",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

export const msg = {
  replyError: (error: any) => {
    if (error instanceof Error) {
      const err = <Error>error;
      Logger.error(err.message);
      return { successful: false, message: err.message };
    }
    return { succesful: false, message: JSON.stringify(error) };
  },
  replyWarning: (message: string) => {
    Logger.warn(message);
    return { successful: false, message };
  },
  replySuccess: (message: string) => {
    Logger.info(message);
    return { successful: true, message };
  },
  replyToken: (token: string) => {
    return { successful: true, token };
  },
};
