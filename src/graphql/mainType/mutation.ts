import { createUser } from "@graphql/user/mut/createUser";
import { login } from "@graphql/user/mut/login";
import { createFirstAdmin } from "@user/mut/createFirstAdmin";
import { GraphQLObjectType } from "graphql";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation list",
  fields: {
    createFirstAdmin,
    login,
    createUser,
  },
});
