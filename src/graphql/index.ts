import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "@queries/user";
import { CREATE_FIRST_ADMIN, CREATE_USER, LOGIN } from "@mutations/user";

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
    createFirstAdmin: CREATE_FIRST_ADMIN,
    createUser: CREATE_USER,
    login: LOGIN,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
