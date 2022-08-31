import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "@queries/user";
import { CREATE_USER } from "@mutations/user";

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Query List",
  fields: {
    getAllUsers: GET_ALL_USERS,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation list",
  fields: {
    createUser: CREATE_USER,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
