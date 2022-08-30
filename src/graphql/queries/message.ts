import { GraphQLString } from "graphql";
import { MessageType } from "@type_defs/message";

export const GET_MESSAGE = {
  type: MessageType,
  description: "Get Message",
  args: {
    name: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return {
        message: `Hello ${args.name}!`
    }
  },
};
