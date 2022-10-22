import { resultType } from "@graphql/mainType/result";
import { GraphQLObjectType, GraphQLString } from "graphql";

export const GreetingType = new GraphQLObjectType({
  name: "Greeting",
  description: "Greeting Result",
  fields: () => ({
    result: { type: resultType },
    greeting: { type: GraphQLString },
  }),
});
