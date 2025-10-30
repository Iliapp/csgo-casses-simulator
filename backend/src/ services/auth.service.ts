import DatabaseService from "./database.service.js";
// import jwt from "jsonwebtoken";
// import {config} from "../config.js"
import bcrypt from "bcryptjs";
import JwtService from "./jwt.service.js";



export class AuthService {
    private db: DatabaseService;
    private jwt: JwtService;

    constructor() {
        this.db = new DatabaseService();
        this.jwt = new JwtService();
    }

    async singUp(email: string, password: string, name: string) {
        const existUser = await this.db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (existUser.rowCount > 0) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.db.query(
            `INSERT INTO users (email, password, name, balance, role, created_at)
                   VALUES ($1, $2, $3, $4, $5, NOW())
                   RETURNING id, email, name, balance, role, created_at`,
            [email, hashedPassword, name, 0, "user"]
        );

        const user = newUser.rows[0];


        const token = this.jwt.generateToken(user.email);

        return { ...user, token };
    }



    async signIn(email: string, password: string) {
        const result = await this.db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rowCount === 0) {
            throw new Error("User not found");
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Passwords do not match");
        }

        const token = this.jwt.generateToken(user.email);

        const { password: _, ...userData } = user;
        return { ...userData, token };
    }





//     async requestPassword(email: string): Promise<string> {
//         const result = await this.authService.query(
//             "SELECT * FROM users WHERE email = $1",
//             [email]
//         );
//
//            if(result.rowCount === 0) {
//                throw new Error("User not found");
//            }
//         const user = result.rows[0];
//
//         const secret = config.JWT_SECRET_KEY + user.password;
//         const token = jwt.sign(
//             { id: user.id, email: user.email },
//             secret,
//             { expiresIn: "1h" }
//         );
//         const resetURL = `${config.DB_DATABASE}/resetpassword?id=${user.id}&token=${token}`;
//
//         const transporter = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//                 user: config.,
//                 pass: config.,
//             },
//         });
//         const mailOptions = {
//             to: user.email,
//             from: config.EMAIL_USER,
//             subject: "Password Reset Request",
//             text: `You are receiving this because you (or someone else) have requested the reset of your account password.\n\n
// Please click the following link or paste it into your browser:\n\n${resetURL}\n\n
// If you did not request this, ignore this email.`,
//         };
//
//         await transporter.sendMail(mailOptions);
//
//         return "Password reset link sent";
//
//
//         }
//     }




}
