import { Logger } from "@utils/logger";
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const resultType = new GraphQLObjectType({
  name: "Result",
  description: "Request result.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    error: { type: GraphQLString },
  }),
});

export const replyError = (message: string, error: any) => {
  if (error instanceof Error) {
    const err = <Error>error;
    Logger.error(err.message);
    return { successful: false, message, error: err.message };
  }
  return { succesful: false, message, error: JSON.stringify(error) };
};

export const replyWarning = (message: string) => {
  Logger.warn(message);
  return { successful: false, message };
};

export const replySuccess = (message: string) => {
  Logger.info(message);
  return { successful: true, message };
};
