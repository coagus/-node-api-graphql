import { Logger } from "@utils/logger";
import { GraphQLList, GraphQLObjectType } from "graphql";
import { userType } from "@user/type/user";
import { resultType } from "@graphql/mainType/result";

export const UserListResultType = new GraphQLObjectType({
  name: "UserListResult",
  description: "User list result.",
  fields: () => ({
    result: { type: resultType },
    userList: {
      type: new GraphQLList(userType),
    },
  }),
});
