import { resultType } from "@graphql/mainType/result";
import { GraphQLObjectType, GraphQLString } from "graphql";

export const tokenType = new GraphQLObjectType({
  name: "Token",
  description: "Token Result",
  fields: () => ({
    result: { type: resultType },
    token: { type: GraphQLString },
  }),
});
