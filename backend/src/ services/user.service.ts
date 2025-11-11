import DatabaseService  from "./database.service.js";
import bcrypt from "bcryptjs";





export class UserService {
    private db: DatabaseService;

    constructor(db: DatabaseService) {
        this.db = db;
    }






    async getAllUsers(){
        const users: any[] = await this.db.getAllUsers();

        return users.map(({ password_hash, ...rest }) => rest);

    }







}






