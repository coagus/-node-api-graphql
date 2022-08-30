import { GraphQLObjectType, GraphQLString } from "graphql";

export const MessageType = new GraphQLObjectType({
  name: "Message",
  description: "Message Result",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});
