
import {Pool} from 'pg'
import {config} from '../config.js'
import dotenv from 'dotenv';



dotenv.config();

class DatabaseService {
    pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: config.DB_USER,
            host: config.DB_HOST,
            database: config.DB_DATABASE,
            password: config.DB_PASSWORD,
            port: config.DB_PORT,
        });

        this.pool.on('connect', () => {
           console.log('Connected to Database');
        });

        this.pool.on('error', (err) => {
            console.error("Fail connect",err);
            process.exit(1);
        });

    }

    async query(text: string, params?: any[]): Promise<any> {
        try {
            const res = await this.pool.query(text,params)
            return res
        } catch(err) {
            console.error("Fail query",err);
            throw err;
        }
    }

    public async getUserByEmail(email: string): Promise<any | null> {
        const query = `SELECT * FROM users WHERE email = $1`;
        const res = await this.pool.query(query, [email]);


        if (res.rows.length > 0) {
            return res.rows[0];

        }
        return null
    }

    public async getAllUsers(): Promise<any> {
        const query = `SELECT * FROM users`;
        const res = await this.pool.query(query);


        if (res.rows.length > 0) {
            return res.rows;
        }
        return [];
    }

    public async updateUserPassword(login: string, newHashedPassword: string): Promise<void> {
        const query = `UPDATE users SET password_hash = $1 WHERE display_name = $2 `;
        await this.pool.query(query, [newHashedPassword, login]);

    }

    // public async updateUserPrivacy(login: string, isPrivate: string): Promise<void> {
    //     const query = `UPDATE users SET `
    // } це не розумію як робити з моїми методами

    public async UpdateUserDisplayName(newName: string, id: number): Promise<void> {
        const query = `UPDATE users SET display_name = $1 WHERE id = $2 `;
        await this.pool.query(query, [newName, id]);
    }

    public async updateUserBalance(newBalance: number, id: number): Promise<void> {
        const query = `UPDATE users SET balance = $1 WHERE id = $2 `;
        await this.pool.query(query, [newBalance,id]);

    }

    public async updateRole(newRole:string, id:number): Promise<void> {
        const query = `UPDATE users SET role = $1 WHERE id = $2 `;
        await this.pool.query(query, [newRole, id]);
    }

    public async deleteUser(id:number): Promise<void> {
        const checkQuery = `SELECT 1 FROM users WHERE id = $1 LIMIT 1`;
        const res = await this.pool.query(checkQuery, [id]);
        const exist = res.rows.length > 0;

        if (exist) {
            const query = `DELETE FROM users WHERE id = $1 `;
            await this.pool.query(query, [id]);
            console.log(`'deleted user',${id}`);
        } else {
            console.error("Fail deleteUser",);
        }
    }

}


export default DatabaseService;