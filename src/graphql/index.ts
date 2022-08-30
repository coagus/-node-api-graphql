import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_MESSAGE } from "@queries/message";
import { GET_ALL_USERS } from "@queries/user";

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Query List",
  fields: {
    getMessage: GET_MESSAGE,
    getAllUsers: GET_ALL_USERS
  },
});

export const schema = new GraphQLSchema({
  query: Query,
});
