import DatabaseService  from "./database.service.js";
import bcrypt from "bcryptjs";


// interface User {
//    do robić
// }



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
                throw new Error("User with email ${login} not found");
            }

            const isMatch = await bcrypt.compareSync(oldPasswordInput, user.password_hash);
            if (!isMatch) {
                throw new Error("Current password is incorrect");
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            await this.db.updateUserPassword(login, hashedPassword);

    }







}






