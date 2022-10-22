import { User } from "@entities/user";
import { replyError, replySuccess } from "@graphql/mainType/result";
import { UserListResultType } from "@user/type/userList";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

export const getAllUsers = {
  type: UserListResultType,
  description: "Get all user list.",
  resolve(_: any, __: any, req: any) {
    Logger.debug("user.qry.getAllUsers");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return { result: replyError("Error in get all users!", error) };
    }

    return { result: replySuccess(""), userList: User.find() };
  },
};
