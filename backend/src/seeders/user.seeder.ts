import bcrypt from "bcrypt";
import {RoleName} from "../enums/role-name.enum";
import {User} from "../models/user.model";

export class UserSeeder {
    public async seed(): Promise<void> {
        const adminExists = await User.findOne({
            email: "admin@gmail.com",
        });

        if (adminExists) {
            return;
        }

        const hashedPassword = await bcrypt.hash("admin", 10);

        await User.create({
            name: "Admin",
            surname: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: RoleName.ADMIN,
            isActive: true,
            lastLogin: null,
            banned: false,
        });
    }
}

export const userSeeder = new UserSeeder();

