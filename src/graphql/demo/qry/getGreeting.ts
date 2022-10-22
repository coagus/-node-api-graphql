import { GreetingType } from "@demo/type/greeting";
import { replySuccess, replyWarning } from "@graphql/mainType/result";
import { GraphQLString } from "graphql";

export const getGreeting = {
  type: GreetingType,
  description: "Get a greeting.",
  args: {
    name: { type: GraphQLString },
  },
  resolve(_: any, args: any) {
    const { name } = args;
    if (name === "")
      return { result: replyWarning("Please send your name for greeting.") };
    return { result: replySuccess(""), greeting: `Hello ${name}` };
  },
};
