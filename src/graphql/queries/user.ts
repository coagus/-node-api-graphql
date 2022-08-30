import { User } from "@entities/user";
import { UserType } from "@type_defs/user";
import { Logger } from "@utils/logger";
import { GraphQLList } from "graphql";

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    description: "Get all user list.",
    resolve() {
        Logger.debug("graphql.queries.user.GET_ALL_USERS.resolve()")
        return User.find();
    }
}