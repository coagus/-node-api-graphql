import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_MESSAGE } from "@queries/message";

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Query List",
  fields: {
    getMessage: GET_MESSAGE,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
});
