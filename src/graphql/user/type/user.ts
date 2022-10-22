import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const userType = new GraphQLObjectType({
  name: "User",
  description: "User data.",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
