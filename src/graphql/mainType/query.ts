import { getGreeting } from "@graphql/demo/qry/getGreeting";
import { getAllUsers } from "@graphql/user/qry/getAllUsers";
import { GraphQLObjectType } from "graphql";

export const query = new GraphQLObjectType({
  name: "Query",
  description: "Query List",
  fields: {
    getGreeting,
    getAllUsers,
  },
});
