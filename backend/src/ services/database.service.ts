
import {Pool} from 'pg'
import {config} from '../config.js'
import dotenv from 'dotenv';



dotenv.config();

class DatabaseService {
    private pool: Pool;

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

}


export default DatabaseService;