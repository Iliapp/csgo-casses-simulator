import DatabaseService  from "./database.service.js";
import bcrypt from "bcryptjs";


interface User {
   id: number;
   email: string;
   password_hash: string;
   display_name: string;
   balance: number;
   created_at: Date;
   role: string;


}



export class UserService {
    private db: DatabaseService;

    constructor(db: DatabaseService) {
        this.db = db;
    }








    async getAllUsers(){
        const users: any[] = await this.db.getAllUsers();

        return users.map(({ password_hash, ...rest }) => rest);

    }

    async getUserByEmail(email: string) {
        const user = await this.db.getUserByEmail(email);

        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }

        return {
            id: user.id,
            email: user.email,
            display_name: user.display_name,
            balance: user.balance,
            created_at: user.created_at,
            role: user.role
        };



    }

        async updateUserPassword(login: string, oldPasswordInput: string, newPassword:string): Promise<void> {
            const user = await this.db.getUserByEmail(login);
            if (!user) {
                throw new Error(`User with email ${login} not found`);
            }

            const isMatch = await bcrypt.compare(oldPasswordInput, user.password_hash);
            if (!isMatch) {
                throw new Error("Current password is incorrect");
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            await this.db.updateUserPassword(login, hashedPassword);

    }

        async UpdateUserDisplayName(login: string, name: string): Promise<void> {
            const user = await this.db.getUserByEmail(login);
            if (!user) {
                throw new Error("User with email ${login} not found");
            }

            if (!name || name.trim().length === 0) {
                throw new Error("Display name cannot be empty");
            }

            if (name.length < 3 || name.length > 20)  {
                throw new Error("Display name must be between 3 and 20 characters");

            }

            const validNameRegex = /^[a-zA-Zа-яА-Я0-9 _]+$/;
            if (!validNameRegex.test(name)) {
                throw new Error("Display name contains invalid characters");
            }


            await this.db.UpdateUserDisplayName(name, user.id);

        }

        async updateUserBalance(login: string, balance: number): Promise<void> {
        const user = await this.db.getUserByEmail(login);
        if (!user) {
            throw new Error(`User with email ${login} not found`);
        }
        if (balance < 0) {
            throw new Error("Balance cannot be negative");
        }

            await this.db.updateUserBalance(balance,user.id);


        }

        async updateUserRole(login: string, role: string): Promise<void> {
        const user = await this.db.getUserByEmail(login);
        if(!user) {
            throw new Error(`User with email ${login} not found`);
        }
        await this.db.updateRole(role, user.id);
        }

    async deleteUser(deluser: string): Promise<void> {
        const user = await this.db.getUserByEmail(deluser)

        if (!user) {
            throw new Error(`User with email ${deluser} not found`);
        }
        await this.db.deleteUser(user.id);

    }



}






