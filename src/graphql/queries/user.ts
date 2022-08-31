import { User } from "@entities/user";
import { replyError, UserListResultType } from "@type_defs/user";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

export const GET_ALL_USERS = {
  type: UserListResultType,
  description: "Get all user list.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.user.GET_ALL_USERS");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, userList: User.find() };
  },
};
