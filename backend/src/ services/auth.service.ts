import DatabaseService from "./database.service.js";

export class AuthService {
    private usersService: DatabaseService;

    constructor() {
        this.usersService = new DatabaseService();
    }

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.usersService.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (user.rowCount === 0) {
            throw new Error("User not found");
        }
        const foundUser = user.rows[0];

// Soon make check password через bcrypt і генерація JWT
        return result;
    }
}