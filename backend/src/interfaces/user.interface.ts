import {RoleName} from "../enums/roleName.enum";
import {IBase} from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: RoleName;
    isActive: boolean;
    lastLogin: Date | null;
    banned: boolean;
}