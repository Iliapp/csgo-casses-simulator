import DatabaseService from "./database.service.js";
import bcrypt from "bcryptjs";
import JwtService from "./jwt.service.js";

interface User {
    id: number;
    email: string;
    name: string;
    balance: number;
    role: string;
    created_at: Date;
}

interface AuthResult extends User {
    token: string;
}

export class AuthService {
    private db: DatabaseService;
    private jwt: JwtService;

    constructor() {
        this.db = new DatabaseService();
        this.jwt = new JwtService();
    }

    private createToken(email: string) {
        return this.jwt.generateToken(email);
    }

    async signUp(email: string, password: string, name: string): Promise<AuthResult> {
        const existUser = await this.db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existUser.rowCount > 0) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.db.query(
            `INSERT INTO users (email, password, name, balance, role, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, email, name, balance, role, created_at`,
            [email, hashedPassword, name, 0, "user"]
        );

        const user = newUser.rows[0];
        const token = this.createToken(user.email);
        return { ...user, token };
    }

    async signIn(email: string, password: string): Promise<AuthResult> {
        const result = await this.db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rowCount === 0) throw new Error("User not found");

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Passwords do not match");

        const token = this.createToken(user.email);
        const { password: _, ...userData } = user;
        return { ...userData, token };
    }

    async verifyToken(token: string): Promise<User> {
        const payload = this.jwt.verifyToken(token);
        const email = payload.login;

        const result = await this.db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rowCount === 0) throw new Error("User not found");

        const { password: _, ...userData } = result.rows[0];
        return userData;
    }
}

export default AuthService;
