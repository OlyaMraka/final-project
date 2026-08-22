import type {Token, User} from "../../types/user.ts";

export type UserSliceType = {
    user?: User;
    token?: Token;
    error?: string;
}
