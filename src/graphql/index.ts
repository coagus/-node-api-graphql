import { GraphQLSchema } from "graphql";
import { query } from "@graphql/mainType/query";
import { mutation } from "@graphql/mainType/mutation";

export const schema = new GraphQLSchema({
  query,
  mutation,
});
